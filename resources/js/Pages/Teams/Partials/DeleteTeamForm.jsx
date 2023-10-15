import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import classNames from "classnames";

import useRoute from "@/Hooks/useRoute";

import { ActionSection, DangerButton, SecondaryButton, Confirmation } from "@/Components";

const DeleteTeamForm = ({ team }) => {
    const route = useRoute();
    const [confirmingTeamDeletion, setConfirmingTeamDeletion] = useState(false);
    const form = useForm({});

    const confirmTeamDeletion = () => {
        setConfirmingTeamDeletion(true);
    };

    const deleteTeam = () => {
        form.delete(route("teams.destroy", [team]), {
            errorBag: "deleteTeam",
        });
    };

    return (
        <ActionSection
            title={"Delete Team"}
            description={"Permanently delete this team."}
        >
            <div className="max-w-xl text-sm text-gray-600 dark:text-gray-400">
                Once a team is deleted, all of its resources and data will be
                permanently deleted. Before deleting this team, please download any data
                or information regarding this team that you wish to retain.
            </div>

            <div className="mt-5">
                <DangerButton onClick={confirmTeamDeletion}>Delete Team</DangerButton>
            </div>

            {/* <!-- Delete Team Confirmation Modal --> */}
            <Confirmation
                isOpen={confirmingTeamDeletion}
                onClose={() => setConfirmingTeamDeletion(false)}
            >
                <Confirmation.Content title={"Delete Team"}>
                    Are you sure you want to delete this team? Once a team is deleted, all
                    of its resources and data will be permanently deleted.
                </Confirmation.Content>

                <Confirmation.Footer>
                    <SecondaryButton onClick={() => setConfirmingTeamDeletion(false)}>
                        Cancel
                    </SecondaryButton>

                    <DangerButton
                        onClick={deleteTeam}
                        className={classNames("ml-2", { "opacity-25": form.processing })}
                        disabled={form.processing}
                    >
                        Delete Team
                    </DangerButton>
                </Confirmation.Footer>
            </Confirmation>
        </ActionSection>
    );
};

export default DeleteTeamForm;
