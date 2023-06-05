import React from "react";
import { useForm } from "@inertiajs/inertia-react";

import { Header, Body, CloseButton } from "@/Components/Modal";
import { PrimaryButton, DangerButton } from "@/Components/Buttons";

import useRoute from "@/Hooks/useRoute";

const Delete = ({ handleCancel, handleDelete, type, handleClose, route: deleteRoute, params: deleteParams }) => {
    const form = useForm({});
    const route = useRoute();

    const handleSubmit = (e) => {
        e.preventDefault();

        form.delete(route(deleteRoute, deleteParams), {
            onSuccess: () => {
                if (handleDelete) {
                    handleDelete();
                }

                handleClose();
            },
        });
    };

    const handleCancelConfirmation = () => {
        if (handleCancel) {
            handleCancel();
        }

        handleClose();
    };

    return (
        <>
            {handleClose && (
                <CloseButton handleClose={handleCancelConfirmation} />
            )}

            <Header>
                Are you sure?
            </Header>

            <Body>
                Are you sure you want to delete this {type ?? "item"}?

                <form onSubmit={handleSubmit} name="delete-form" className="flex space-x-4 justify-end">
                    <PrimaryButton type="button" onClick={handleCancelConfirmation}>
                        Cancel
                    </PrimaryButton>

                    <DangerButton form="delete-form" type="button" onClick={handleSubmit}>
                        Delete
                    </DangerButton>
                </form>
            </Body>
        </>
    );
};

export default Delete;
