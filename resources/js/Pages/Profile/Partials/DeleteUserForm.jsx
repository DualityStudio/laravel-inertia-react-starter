import React, { useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import classNames from 'classnames';

import useRoute from '@/Hooks/useRoute';

import { ActionSection, DangerButton, Dialog, InputError, SecondaryButton, TextInput } from '@/Components';

const DeleteUserForm = () => {
    const route = useRoute();
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const form = useForm({
        password: '',
    });
    const passwordRef = useRef(null);

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);

        setTimeout(() => passwordRef.current?.focus(), 250);
    };

    const deleteUser = () => {
        form.delete(route('current-user.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordRef.current?.focus(),
            onFinish: () => form.reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        form.reset();
    };

    return (
        <ActionSection
            title={'Delete Account'}
            description={'Permanently delete your account.'}
        >
            <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
                Once your account is deleted, all of its resources and data will be
                permanently deleted. Before deleting your account, please download any
                data or information that you wish to retain.
            </div>

            <div className="mt-5">
                <DangerButton onClick={confirmUserDeletion}>
                    Delete Account
                </DangerButton>
            </div>

            {/* <!-- Delete Account Confirmation Modal --> */}
            <Dialog isOpen={confirmingUserDeletion} onClose={closeModal}>
                <Dialog.Content title={'Delete Account'}>
                    Are you sure you want to delete your account? Once your account is
                    deleted, all of its resources and data will be permanently deleted.
                    Please enter your password to confirm you would like to permanently
                    delete your account.
                    <div className="mt-4">
                        <TextInput
                            type="password"
                            className="mt-1 block w-3/4"
                            placeholder="Password"
                            value={form.data.password}
                            onChange={e => form.setData('password', e.currentTarget.value)}
                        />

                        <InputError message={form.errors.password} className="mt-2" />
                    </div>
                </Dialog.Content>

                <Dialog.Footer>
                    <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                    <DangerButton
                        onClick={deleteUser}
                        className={classNames('ml-2', { 'opacity-25': form.processing })}
                        disabled={form.processing}
                    >
                        Delete Account
                    </DangerButton>
                </Dialog.Footer>
            </Dialog>
        </ActionSection>
    );
};

export default DeleteUserForm;
