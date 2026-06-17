"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_scroll;

vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865,0.366025403,-0.577350269,0.024390243);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
  i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.);
  m=m*m; m=m*m;
  vec3 x=2.*fract(p*C.www)-1.;
  vec3 h=abs(x)-0.5;
  vec3 ox=floor(x+0.5);
  vec3 a0=x-ox;
  m*=1.79284291-0.85373472*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.*dot(m,g);
}

float fbm(vec2 p){
  float v=0.; float a=0.5;
  for(int i=0;i<5;i++){ v+=a*snoise(p); p*=2.0; a*=0.5; }
  return v;
}

void main(){
  vec2 uv=gl_FragCoord.xy/u_res.xy;
  vec2 st=uv;
  st.x*=u_res.x/u_res.y;

  float t=u_time*0.04;
  vec2 mo=(u_mouse-0.5)*0.4;

  float n=fbm(st*1.6 + vec2(t, t*0.5) + mo);
  float n2=fbm(st*2.8 - vec2(t*0.7, -t*0.3) + n*0.4);
  float flow=fbm(st*1.2 + n2*0.6 + vec2(0., u_scroll*0.3));

  vec3 deep=vec3(0.024,0.024,0.02);
  vec3 mid=vec3(0.16,0.12,0.06);
  vec3 gold=vec3(0.788,0.663,0.431);
  vec3 bright=vec3(0.902,0.784,0.569);

  float v=smoothstep(-0.2,0.9,flow);
  vec3 col=mix(deep,mid,smoothstep(0.0,0.5,v));
  col=mix(col,gold*0.5,smoothstep(0.45,0.8,v));
  col=mix(col,bright*0.6,smoothstep(0.75,1.0,v)*0.5);

  float line=abs(fract(flow*4.0)-0.5);
  float fil=smoothstep(0.02,0.0,line)*0.4;
  col+=gold*fil*smoothstep(0.3,0.9,v);

  float vig=1.0-length(uv-0.5)*0.9;
  col*=vig;
  col*=0.42;

  gl_FragColor=vec4(col,1.0);
}
`;

export default function ShaderBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext("webgl");

        if (!gl) {
            canvas.style.background =
                "radial-gradient(ellipse at 60% 40%, #1a1509, #060605)";
            return;
        }

        const compile = (type, src) => {
            const s = gl.createShader(type);
            gl.shaderSource(s, src);
            gl.compileShader(s);
            return s;
        };

        const prog = gl.createProgram();
        gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
        gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
        gl.linkProgram(prog);
        gl.useProgram(prog);

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
            gl.STATIC_DRAW
        );
        const loc = gl.getAttribLocation(prog, "p");
        gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

        const uRes = gl.getUniformLocation(prog, "u_res");
        const uTime = gl.getUniformLocation(prog, "u_time");
        const uMouse = gl.getUniformLocation(prog, "u_mouse");
        const uScroll = gl.getUniformLocation(prog, "u_scroll");

        let mouse = { x: 0.5, y: 0.5 };
        const onMove = (e) => {
            mouse.x = e.clientX / window.innerWidth;
            mouse.y = 1 - e.clientY / window.innerHeight;
        };
        window.addEventListener("mousemove", onMove);

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener("resize", resize);

        const start = performance.now();
        let raf;
        const render = () => {
            const tm = (performance.now() - start) / 1000;
            const scroll =
                window.scrollY /
                (document.body.scrollHeight - window.innerHeight || 1);
            gl.uniform2f(uRes, canvas.width, canvas.height);
            gl.uniform1f(uTime, tm);
            gl.uniform2f(uMouse, mouse.x, mouse.y);
            gl.uniform1f(uScroll, scroll);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            raf = requestAnimationFrame(render);
        };
        render();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return <canvas id="glCanvas" ref={canvasRef} />;
}
