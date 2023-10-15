import React, { useRef, useState } from "react";
import axios from "axios";
import classNames from "classnames";

import useRoute from "@/Hooks/useRoute";

import { InputError, PrimaryButton, SecondaryButton, TextInput, Dialog } from "@/Components";

const ConfirmsPassword = ({
    title = "Confirm Password",
    content = "For your security, please confirm your password to continue.",
    button = "Confirm",
    onConfirm,
    children,
}) => {
    const route = useRoute();
    const [confirmingPassword, setConfirmingPassword] = useState(false);
    const [form, setForm] = useState({
        password: "",
        error: "",
        processing: false,
    });
    const passwordRef = useRef(null);

    const startConfirmingPassword = () => {
        axios.get(route("password.confirmation")).then(response => {
            if (response.data.confirmed) {
                onConfirm();
            } else {
                setConfirmingPassword(true);

                setTimeout(() => passwordRef.current?.focus(), 250);
            }
        });
    };

    const confirmPassword = () => {
        setForm({ ...form, processing: true });

        axios
            .post(route("password.confirm"), {
                password: form.password,
            })
            .then(() => {
                closeModal();
                setTimeout(() => onConfirm(), 250);
            })
            .catch(error => {
                setForm({
                    ...form,
                    processing: false,
                    error: error.response.data.errors.password[0],
                });
                passwordRef.current?.focus();
            });
    };

    const closeModal = () => {
        setConfirmingPassword(false);
        setForm({ processing: false, password: "", error: "" });
    };

    return (
        <span>
            <span onClick={ startConfirmingPassword }>{ children }</span>

            <Dialog isOpen={ confirmingPassword } onClose={ closeModal }>
                <Dialog.Content title={ title }>
                    { content }

                    <div className="mt-4">
                        <TextInput
                            ref={ passwordRef }
                            type="password"
                            className="mt-1 block w-3/4"
                            placeholder="Password"
                            value={ form.password }
                            onChange={ e => setForm({ ...form, password: e.currentTarget.value }) }
                        />

                        <InputError message={ form.error } className="mt-2"/>
                    </div>
                </Dialog.Content>

                <Dialog.Footer>
                    <SecondaryButton onClick={ closeModal }>Cancel</SecondaryButton>

                    <PrimaryButton
                        className={ classNames("ml-2", { "opacity-25": form.processing }) }
                        onClick={ confirmPassword }
                        disabled={ form.processing }
                    >
                        { button }
                    </PrimaryButton>
                </Dialog.Footer>
            </Dialog>
        </span>
    );
};

export default ConfirmsPassword;
