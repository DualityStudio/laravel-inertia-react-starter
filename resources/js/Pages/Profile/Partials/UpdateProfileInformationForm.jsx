import { Inertia } from "@inertiajs/inertia";
import { useForm, usePage } from "@inertiajs/inertia-react";
import classNames from "classnames";
import React, { useRef, useState } from "react";
import useRoute from "@/Hooks/useRoute";
import ActionMessage from "@/Components/ActionMessage";
import FormSection from "@/Components/FormSection";

import { InputError, TextInput, InputLabel } from "@/Components/Form";
import { PrimaryButton, SecondaryButton } from "@/Components/Buttons";
import { useUpload } from '@/Hooks';

export default function UpdateProfileInformationForm ({ user }) {
    const { upload } = useUpload();

    const form = useForm({
        _method: "PUT",
        name: user.name,
        email: user.email,
        photo: null,
    });
    const route = useRoute();
    const [photoPreview, setPhotoPreview] = useState(null);
    const photoRef = useRef(null);
    const page = usePage();

    const updateProfileInformation = async () => {
        const uploadRequest = await upload(form.data.photo);

        await Inertia.put(route("user-profile-information.update"), {
            ...form.data,
            photo: uploadRequest.key
        }, {
            errorBag: "updateProfileInformation",
            preserveScroll: true,
            onSuccess: () => {
                clearPhotoFileInput();
            }
        });
    };

    function selectNewPhoto () {
        photoRef.current?.click();
    }

    function updatePhotoPreview () {
        const photo = photoRef.current?.files?.[0];

        if (!photo) {
            return;
        }

        form.setData("photo", photo);

        const reader = new FileReader();

        reader.onload = e => {
            setPhotoPreview(e.target?.result);
        };

        reader.readAsDataURL(photo);
    }

    function deletePhoto () {
        Inertia.delete(route("current-user-photo.destroy"), {
            preserveScroll: true,
            onSuccess: () => {
                setPhotoPreview(null);
                clearPhotoFileInput();
            },
        });
    }

    function clearPhotoFileInput () {
        if (photoRef.current?.value) {
            photoRef.current.value = "";
            form.setData("photo", null);
        }
    }

    return (
        <FormSection
            onSubmit={updateProfileInformation}
            title={"Profile Information"}
            description={"Update your account's profile information and email address."}
            renderActions={() => (
                <>
                    <ActionMessage on={form.recentlySuccessful} className="mr-3">
                        Saved.
                    </ActionMessage>

                    <PrimaryButton
                        className={classNames({ "opacity-25": form.processing })}
                        disabled={!form.isDirty}
                        processing={form.processing}
                    >
                        Save
                    </PrimaryButton>
                </>
            )}
        >
            {/* <!-- Profile Photo --> */}
            {page.props.jetstream.managesProfilePhotos
                ? (
                        <div className="col-span-6 sm:col-span-4">
                            {/* <!-- Profile Photo File Input --> */}
                            <input
                                type="file"
                                className="hidden"
                                ref={photoRef}
                                onChange={updatePhotoPreview}
                            />

                            <InputLabel htmlFor="photo" value="Photo" />

                            {photoPreview
                                ? (
                            // <!-- New Profile Photo Preview -->
                                        <div className="mt-2">
                                            <span
                                                className="block rounded-full w-20 h-20"
                                                style={{
                                                    backgroundSize: "cover",
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: "center center",
                                                    backgroundImage: `url('${photoPreview}')`,
                                                }}
                                            ></span>
                                        </div>
                                    )
                                : (
                            // <!-- Current Profile Photo -->
                                        <div className="mt-2">
                                            <img
                                                src={user.profile_photo_url}
                                                alt={user.name}
                                                className="rounded-full h-20 w-20 object-cover"
                                            />
                                        </div>
                                    )}

                            <SecondaryButton
                                className="mt-2 mr-2"
                                type="button"
                                onClick={selectNewPhoto}
                            >
                        Select A New Photo
                            </SecondaryButton>

                            {user.profile_photo_path
                                ? (
                                        <SecondaryButton
                                            type="button"
                                            className="mt-2"
                                            onClick={deletePhoto}
                                        >
                            Remove Photo
                                        </SecondaryButton>
                                    )
                                : null}

                            <InputError message={form.errors.photo} className="mt-2" />
                        </div>
                    )
                : null}

            {/* <!-- Name --> */}
            <div className="col-span-6 sm:col-span-4">
                <InputLabel htmlFor="name" value="Name" />
                <TextInput
                    id="name"
                    type="text"
                    className="mt-1 block w-full"
                    value={form.data.name}
                    onChange={e => form.setData("name", e.currentTarget.value)}
                    autoComplete="name"
                />
                <InputError message={form.errors.name} className="mt-2" />
            </div>

            {/* <!-- Email --> */}
            <div className="col-span-6 sm:col-span-4">
                <InputLabel htmlFor="email" value="Email" />
                <TextInput
                    id="email"
                    type="email"
                    className="mt-1 block w-full"
                    value={form.data.email}
                    onChange={e => form.setData("email", e.currentTarget.value)}
                />
                <InputError message={form.errors.email} className="mt-2" />
            </div>
        </FormSection>
    );
}
