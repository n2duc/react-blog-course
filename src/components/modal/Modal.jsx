import React from "react";

const Modal = ({ closeModal }) => {
    return (
        <div className="bg-white p-4 max-w-[500px] w-full rounded-md">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-teal-800 text-lg font-medium">Forget Password?</h2>
                <button className="hover:animate-spin" onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <p className="py-3 border-t border-b mb-4">Relax and try to remember your password.</p>
            <div className="flex items-center justify-end">
                <button onClick={closeModal} className="inline-block ml-auto px-3 py-2 bg-teal-500 rounded-sm font-medium text-white text-sm hover:bg-teal-600">Thanks!</button>
            </div>
        </div>
    );
};

export default Modal;
