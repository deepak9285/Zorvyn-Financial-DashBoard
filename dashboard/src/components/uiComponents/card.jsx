import React from "react";
const Card = ({ title, amount, icon, color }) => {
    const colorClasses = {
        green: "text-green-500",
        blue: "text-blue-500",
        red: "text-red-500",
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">

            <div className="flex items-center justify-between">
                <h3 className="text-sm text-black font-medium text-gray-500">
                    {title}
                </h3>
                <span className={`text-xl ${colorClasses[color]}`}>
                    {icon}
                </span>
            </div>

            {/* Amount */}
            <p className="text-2xl font-bold text-gray-900 mt-2">
                ₹{amount}
            </p>

            {/* Description */}
            <p className="text-xs text-gray-400 mt-1">
                {color === "green" && "Total income"}
                {color === "blue" && "Current balance"}
                {color === "red" && "Total expenses"}
            </p>

        </div>
    );
};

export default Card;