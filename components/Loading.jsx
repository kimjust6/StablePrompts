"use client";

import DotLoader from "react-spinners/DotLoader";

const Loading = () => {
    return (
        <div className="h-96 flex items-center">
            <DotLoader color="#4f46e5"></DotLoader>
        </div>
    );
};

export default Loading;
