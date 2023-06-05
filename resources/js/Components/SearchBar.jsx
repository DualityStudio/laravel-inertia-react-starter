import React, { useRef, useState } from "react";

import { Card, CardBody } from "@/Components/Card";
import { TextInput } from "@/Components/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons/faTimesCircle";

const SearchBar = ({ searchTerm: initialSearchTerm }) => {
    const formRef = useRef();
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm ?? '');

    return (
        <Card>
            <CardBody>
                <form ref={formRef} action="" method="get" className="flex relative">
                    <TextInput
                        placeholder="Search and hit enter..."
                        type="text"
                        name="searchTerm"
                        value={searchTerm}
                        className="block flex-1"
                        onChange={e => setSearchTerm(e.currentTarget.value)}
                    />

                    {searchTerm && (
                        <div
                            className="absolute right-4 inset-y-0 flex items-center"
                            onClick={async () => {
                                await setSearchTerm('');
                                formRef.current.submit();
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faTimesCircle}
                                className="text-gray-400 cursor-pointer transition duration-200 transform hover:scale-110"
                            />
                        </div>
                    )}
                </form>
            </CardBody>
        </Card>
    );
};


export default SearchBar;
