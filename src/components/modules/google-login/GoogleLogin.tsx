import { toast } from "@/components/ui/toast";
import { useGoogleAuth } from "@/hooks/auth.hook";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginComponent = () => {
    const router = useRouter();
    const { mutate: googleLogin } = useGoogleAuth();
    const handleGoogleSuccess = (credentialResponse: {
        credential?: string;
    }) => {
        const idToken = credentialResponse.credential;
        if (!idToken) {
            toast.add({
                title: "Google Login Failed",
                description: "Please try again.",
                type: "error",
            });
            return;
        }
        googleLogin(
            { idToken },
            {
                onSuccess: () => {
                    router.push("/");
                    toast.add({
                        title: "Google Login Successful",
                        description: "Welcome back!",
                        type: "success",
                    });
                },
                onError: (err) => {
                    toast.add({
                        title: "Google Login Failed",
                        description:
                            err.message ||
                            "Something went wrong. Please try again",
                        type: "error",
                    });
                },
            },
        );
    };

    const handleGoogleError = () => {
        toast.add({
            title: "Google Login Failed",
            description: "Please try again.",
            type: "error",
        });
    };
    return (
        <GoogleLogin
            theme="outline"
            shape="pill"
            text="continue_with"
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
        />
    );
};

export default GoogleLoginComponent;
