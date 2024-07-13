import { Spinner } from "../../design-system/spinner/Spinner";

export default function Loading() {
  return (
    <div className="h-[100vh] flex items-center justify-center">
      <Spinner />
    </div>
  );
}
