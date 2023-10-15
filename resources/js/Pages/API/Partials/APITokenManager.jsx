import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import classNames from "classnames";

import useRoute from "@/Hooks/useRoute";
import {
    ActionMessage,
    ActionSection,
    Confirmation,
    Dialog,
    Section,
    InputError,
    InputLabel,
    PrimaryButton,
    SecondaryButton,
    SectionBorder,
    TextInput,
    Checkbox,
} from "@/Components";

const APITokenManager = ({ tokens, availablePermissions, defaultPermissions }) => {
    const route = useRoute();
    const createApiTokenForm = useForm({
        name: "",
        permissions: defaultPermissions,
    });
    const updateApiTokenForm = useForm({
        permissions: [],
    });
    const deleteApiTokenForm = useForm({});
    const [displayingToken, setDisplayingToken] = useState(false);
    const [managingPermissionsFor, setManagingPermissionsFor] = useState(null);
    const [apiTokenBeingDeleted, setApiTokenBeingDeleted] = useState(null);
    const page = usePage();

    const createApiToken = () => {
        createApiTokenForm.post(route("api-tokens.store"), {
            preserveScroll: true,
            onSuccess: () => {
                setDisplayingToken(true);
                createApiTokenForm.reset();
            },
        });
    };

    const manageApiTokenPermissions = (token) => {
        updateApiTokenForm.setData("permissions", token.abilities);
        setManagingPermissionsFor(token);
    };

    const updateApiToken = () => {
        if (!managingPermissionsFor) {
            return;
        }

        updateApiTokenForm.put(
            route("api-tokens.update", [managingPermissionsFor]),
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setManagingPermissionsFor(null),
            },
        );
    };

    const confirmApiTokenDeletion = (token) => {
        setApiTokenBeingDeleted(token);
    };

    const deleteApiToken = () => {
        if (!apiTokenBeingDeleted) {
            return;
        }
        deleteApiTokenForm.delete(
            route("api-tokens.destroy", [apiTokenBeingDeleted]),
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => setApiTokenBeingDeleted(null),
            },
        );
    };

    return (
        <div>
            {/* <!-- Generate API Token --> */}
            <Section
                onSubmit={createApiToken}
                title={"Create API Token"}
                description={
                    "API tokens allow third-party services to authenticate with our application on your behalf."
                }
                renderActions={() => (
                    <>
                        <ActionMessage
                            on={createApiTokenForm.recentlySuccessful}
                            className="mr-3"
                        >
                            Created.
                        </ActionMessage>

                        <PrimaryButton
                            className={classNames({
                                "opacity-25": createApiTokenForm.processing,
                            })}
                            disabled={createApiTokenForm.processing}
                        >
                            Create
                        </PrimaryButton>
                    </>
                )}
            >
                {/* <!-- Token Name --> */}
                <div className="col-span-6 sm:col-span-4">
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={createApiTokenForm.data.name}
                        onChange={e =>
                            createApiTokenForm.setData("name", e.currentTarget.value)
                        }
                        autoFocus
                    />
                    <InputError
                        message={createApiTokenForm.errors.name}
                        className="mt-2"
                    />
                </div>

                {/* <!-- Token Permissions --> */}
                {availablePermissions.length > 0 && (
                    <div className="col-span-6">
                        <InputLabel htmlFor="permissions">Permissions</InputLabel>

                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {availablePermissions.map(permission => (
                                <div key={permission}>
                                    <label className="flex items-center">
                                        <Checkbox
                                            value={permission}
                                            checked={createApiTokenForm.data.permissions.includes(
                                                permission,
                                            )}
                                            onChange={e => {
                                                if (
                                                    createApiTokenForm.data.permissions.includes(
                                                        e.currentTarget.value,
                                                    )
                                                ) {
                                                    createApiTokenForm.setData(
                                                        "permissions",
                                                        createApiTokenForm.data.permissions.filter(
                                                            p => p !== e.currentTarget.value,
                                                        ),
                                                    );
                                                } else {
                                                    createApiTokenForm.setData("permissions", [
                                                        e.currentTarget.value,
                                                        ...createApiTokenForm.data.permissions,
                                                    ]);
                                                }
                                            }}
                                        />
                                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                            {permission}
                                        </span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Section>

            {tokens.length > 0 ? (
                <div>
                    <SectionBorder />

                    {/* <!-- Manage API Tokens --> */}
                    <div className="mt-10 sm:mt-0">
                        <ActionSection
                            title={"Manage API Tokens"}
                            description={
                                "You may delete any of your existing tokens if they are no longer needed."
                            }
                        >
                            {/* <!-- API Token List --> */}
                            <div className="space-y-6">
                                {tokens.map(token => (
                                    <div
                                        className="flex items-center justify-between"
                                        key={token.id}
                                    >
                                        <div className="break-all dark:text-white">
                                            {token.name}
                                        </div>

                                        <div className="flex items-center">
                                            {token.last_used_ago && (
                                                <div className="text-sm text-gray-400">
                                                    Last used {token.last_used_ago}
                                                </div>
                                            )}

                                            {availablePermissions.length > 0 ? (
                                                <PrimaryButton
                                                    className="cursor-pointer ml-6 text-sm text-gray-400 underline"
                                                    onClick={() => manageApiTokenPermissions(token)}
                                                >
                                                    Permissions
                                                </PrimaryButton>
                                            ) : null}

                                            <PrimaryButton
                                                className="cursor-pointer ml-6 text-sm text-red-500"
                                                onClick={() => confirmApiTokenDeletion(token)}
                                            >
                                                Delete
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ActionSection>
                    </div>
                </div>
            ) : null}

            {/* <!-- Token Value Modal --> */}
            <Dialog
                isOpen={displayingToken}
                onClose={() => setDisplayingToken(false)}
            >
                <Dialog.Content title={"API Token"}>
                    <div>
                        Please copy your new API token. For your security, it won"t be shown
                        again.
                    </div>

                    <div className="mt-4 bg-gray-100 dark:bg-gray-900 px-4 py-2 rounded font-mono text-sm text-gray-500">
                        {page.props?.jetstream?.flash?.token}
                    </div>
                </Dialog.Content>
                <Dialog.Footer>
                    <SecondaryButton onClick={() => setDisplayingToken(false)}>
                        Close
                    </SecondaryButton>
                </Dialog.Footer>
            </Dialog>

            {/* <!-- API Token Permissions Modal --> */}
            <Dialog
                isOpen={!!managingPermissionsFor}
                onClose={() => setManagingPermissionsFor(null)}
            >
                <Dialog.Content title={"API Token Permissions"}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availablePermissions.map(permission => (
                            <div key={permission}>
                                <label className="flex items-center">
                                    <Checkbox
                                        value={permission}
                                        checked={updateApiTokenForm.data.permissions.includes(
                                            permission,
                                        )}
                                        onChange={e => {
                                            if (
                                                updateApiTokenForm.data.permissions.includes(
                                                    e.currentTarget.value,
                                                )
                                            ) {
                                                updateApiTokenForm.setData(
                                                    "permissions",
                                                    updateApiTokenForm.data.permissions.filter(
                                                        p => p !== e.currentTarget.value,
                                                    ),
                                                );
                                            } else {
                                                updateApiTokenForm.setData("permissions", [
                                                    e.currentTarget.value,
                                                    ...updateApiTokenForm.data.permissions,
                                                ]);
                                            }
                                        }}
                                    />
                                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                        {permission}
                                    </span>
                                </label>
                            </div>
                        ))}
                    </div>
                </Dialog.Content>
                <Dialog.Footer>
                    <SecondaryButton onClick={() => setManagingPermissionsFor(null)}>
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton
                        onClick={updateApiToken}
                        className={classNames("ml-2", {
                            "opacity-25": updateApiTokenForm.processing,
                        })}
                        disabled={updateApiTokenForm.processing}
                    >
                        Save
                    </PrimaryButton>
                </Dialog.Footer>
            </Dialog>

            {/* <!-- Delete Token Confirmation Modal --> */}
            <Confirmation
                isOpen={!!apiTokenBeingDeleted}
                onClose={() => setApiTokenBeingDeleted(null)}
            >
                <Confirmation.Content title={"Delete API Token"}>
                    Are you sure you would like to delete this API token?
                </Confirmation.Content>
                <Confirmation.Footer>
                    <SecondaryButton onClick={() => setApiTokenBeingDeleted(null)}>
                        Cancel
                    </SecondaryButton>

                    <DangerButton
                        onClick={deleteApiToken}
                        className={classNames("ml-2", {
                            "opacity-25": deleteApiTokenForm.processing,
                        })}
                        disabled={deleteApiTokenForm.processing}
                    >
                        Delete
                    </DangerButton>
                </Confirmation.Footer>
            </Confirmation>
        </div>
    );
};

export default APITokenManager;
