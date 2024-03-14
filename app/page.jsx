"use client";
import React, { useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function New() {
    const canvasRef = useRef(null);
    let drawing = false; // indicate whether the user is currently drawing or not

    // allow drawing on the screen
    const draw = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d'); 
        if (!drawing) return;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';

        const rect = canvas.getBoundingClientRect();
        let x, y;
        if (e.type === 'touchmove') {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
    }

    // enable to start drawing on the screen
    const start = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        drawing = true;
        ctx.beginPath();

        const rect = canvas.getBoundingClientRect();
        let x, y;
        if (e.type === 'touchstart') {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }

        ctx.moveTo(x, y);
    }

    // enable to end drawing on the screen
    const end = () => {
        drawing = false;
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        canvas.addEventListener('mousedown', start);
        canvas.addEventListener('mouseup', end);
        canvas.addEventListener('mousemove', draw);

        canvas.addEventListener('touchstart', start);
        canvas.addEventListener('touchend', end);
        canvas.addEventListener('touchmove', draw);

        return () => {
            canvas.removeEventListener('mousedown', start);
            canvas.removeEventListener('mouseup', end);
            canvas.removeEventListener('mousemove', draw);

            canvas.removeEventListener('touchstart', start);
            canvas.removeEventListener('touchend', end);
            canvas.removeEventListener('touchmove', draw);
        }
    }, []);

    // save the drawing as an image
    const saveAsImage = () => {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'sign.png';
        link.click();
    }

    return (
        <>
            <div className="box-border p-5">
                <div className="h-[400px] w-full border border-black border-dashed">
                    <canvas ref={canvasRef} id="cvna" className='h-full w-full bg-white'></canvas>
                </div>
                <div className='m-5 flex gap-4 mt-8'>
                    <button onClick={saveAsImage} className="bg-blue-700 p-3 text-white text-sm pl-4 pr-4 transition-transform outline-none border-none hover:scale-95 w-full">Download</button>
                    <button className="bg-blue-700 p-3 text-white text-sm pl-4 pr-4 transition-transform outline-none border-none hover:scale-95 w-full" onClick={()=>{ const canvas = canvasRef.current;
                        canvas.toBlob((blob) => {
                            navigator.share({
                                files: [new File([blob], 'sign.png', { type: 'image/png' })],
                            });
                        }); }}>Share</button>
                </div>
            </div>
        </>
    );
}
