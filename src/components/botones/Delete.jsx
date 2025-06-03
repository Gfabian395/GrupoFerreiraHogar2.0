import React, { useState, useRef, useEffect } from "react";
import "./Delete.css";

export const Delete = () => {
    const [isRunning, setIsRunning] = useState(false);
    const buttonRef = useRef(null);

    // Maneja el click: activa la animación
    const handleDelete = () => {
        if (!isRunning) {
            setIsRunning(true);
        }
    };

    // Resetea el estado cuando termina la animación
    useEffect(() => {
        const el = buttonRef.current;
        if (!el) return;

        const animTarget = el.querySelector("[data-anim]");

        const onAnimationEnd = () => {
            setIsRunning(false);
        };

        animTarget?.addEventListener("animationend", onAnimationEnd);
        return () => {
            animTarget?.removeEventListener("animationend", onAnimationEnd);
        };
    }, [isRunning]);

    return (
        <button
            id="delete"
            className="del-btn"
            type="button"
            aria-label="Delete"
            onClick={handleDelete}
            data-running={isRunning}
            disabled={isRunning}
            ref={buttonRef}
        >
            <svg
                className="del-btn__icon"
                viewBox="0 0 48 48"
                width="48px"
                height="48px"
                aria-hidden="true"
            >
                <clipPath id="can-clip">
                    <rect className="del-btn__icon-can-fill" x="5" y="24" width="14" height="11" />
                </clipPath>
                <g
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    transform="translate(12,12)"
                >
                    <g className="del-btn__icon-lid">
                        <polyline points="9,5 9,1 15,1 15,5" />
                        <polyline points="4,5 20,5" />
                    </g>
                    <g className="del-btn__icon-can">
                        <g strokeWidth="0">
                            <polyline id="can-fill" points="6,10 7,23 17,23 18,10" />
                            <use clipPath="url(#can-clip)" href="#can-fill" fill="#fff" />
                        </g>
                        <polyline points="6,10 7,23 17,23 18,10" />
                    </g>
                </g>
            </svg>
            <span className="del-btn__letters" aria-hidden="true" data-anim>
                {["B", "o", "r", "r", "a", "r"].map((letter, i) => (
                    <span key={i} className="del-btn__letter-box">
                        <span className="del-btn__letter">{letter}</span>
                    </span>
                ))}
            </span>
        </button>
    );
}
