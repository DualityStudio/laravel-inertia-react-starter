import React from "react";

const Rating = ({ question, form }) => {
    const selected = form.data[question.id];

    return (
        <div className="flex space-x-4 mt-2">
            {[1, 2, 3, 4, 5].map((rating) => (
                <div
                    key={rating}
                    className={`inline-flex cursor-pointer items-center h-10 w-10 ${selected === rating ? 'bg-gray-800 text-white' : 'text-gray-800 hover:bg-gray-200'} border border-gray-800 rounded-full font-semibold text-xs uppercase tracking-widest active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300 disabled:opacity-25 transition flex items-center justify-center`}
                    onClick={() => form.setData(question.id, rating)}
                >
                    {rating}
                </div>
            ))}
        </div>
    );
};

export default Rating;
