import { Spinner } from "../ui/spinner";

const Loading = () => {
    return (
        <div className="min-h-screen mx-auto flex items-center justify-center">
            <Spinner />
        </div>
    );
};

export default Loading;
