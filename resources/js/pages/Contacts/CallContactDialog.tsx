import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Contact } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { simulateCall } from "@/lib/api";

interface CallContactDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    contact: Contact | null;
}

const CallContactDialog: React.FC<CallContactDialogProps> = ({
    isOpen,
    onOpenChange,
    contact,
}) => {
    const [callStatus, setCallStatus] = useState<string | null>(null);
    const [isCalling, setIsCalling] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setCallStatus(null);
            setError(null);
            setIsCalling(false);
        }
    }, [isOpen, contact]);

    const handleCall = async () => {
        if (!contact?.id) return;

        setIsCalling(true);
        setCallStatus(null);
        setError(null);

        try {
            const result = await simulateCall(contact.id);
            setCallStatus(result.status);
            // onCallCompleted(result.status);
        } catch (err: any) {
            console.error("Call simulation failed:", err.message);
            setError(
                err.message || "Failed to simulate call. Please try again.",
            );
            setCallStatus("failed");
            // onCallCompleted("failed");
        } finally {
            setIsCalling(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Simulate Call to {contact?.name}</DialogTitle>
                    <DialogDescription>
                        {contact?.phone_number}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4 text-center">
                    {isCalling ? (
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                            <p className="text-lg font-medium">Calling...</p>
                            <p className="text-sm text-gray-500">
                                Please wait, simulating connection.
                            </p>
                        </div>
                    ) : callStatus ? (
                        <div className="flex flex-col items-center justify-center space-y-2">
                            {callStatus === "connected" && (
                                <>
                                    <span
                                        role="img"
                                        aria-label="phone"
                                        className="text-4xl"
                                    >
                                        📞✅
                                    </span>
                                    <p className="text-xl font-semibold text-green-600">
                                        Call Connected!
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Simulated successful connection.
                                    </p>
                                </>
                            )}
                            {callStatus === "busy" && (
                                <>
                                    <span
                                        role="img"
                                        aria-label="busy"
                                        className="text-4xl"
                                    >
                                        📞⛔
                                    </span>
                                    <p className="text-xl font-semibold text-yellow-600">
                                        Line Busy.
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        The recipient's line is currently busy.
                                    </p>
                                </>
                            )}
                            {callStatus === "no_answer" && (
                                <>
                                    <span
                                        role="img"
                                        aria-label="no answer"
                                        className="text-4xl"
                                    >
                                        📞⏱️
                                    </span>
                                    <p className="text-xl font-semibold text-orange-600">
                                        No Answer.
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        The call rang but was not answered.
                                    </p>
                                </>
                            )}
                            {callStatus === "failed" && (
                                <>
                                    <span
                                        role="img"
                                        aria-label="failed"
                                        className="text-4xl"
                                    >
                                        ❌
                                    </span>
                                    <p className="text-xl font-semibold text-red-600">
                                        Call Failed!
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        An error occurred during the call
                                        simulation.
                                    </p>
                                </>
                            )}
                        </div>
                    ) : (
                        <p className="text-gray-600">
                            Click the button below to simulate the call.
                        </p>
                    )}
                    {error && (
                        <p className="text-red-500 text-sm mt-4">{error}</p>
                    )}
                </div>

                <DialogFooter>
                    {!callStatus ? (
                        <Button onClick={handleCall} disabled={isCalling}>
                            {isCalling ? "Calling..." : "Start Call Simulation"}
                        </Button>
                    ) : (
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                        >
                            Close
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CallContactDialog;
