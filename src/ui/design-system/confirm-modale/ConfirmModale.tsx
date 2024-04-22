import { useContext } from "react";
import { RiCloseFill } from "react-icons/ri";
import { ToggleEditFormContext } from "../../../context/ToggleEditFormContext";
import { Button } from "../button/Button";
import { Typography } from "../typography/Typography";

interface Props {
  message: string;
  action: () => void;
}

export default function ConfirmModale({ message, action }: Props) {
  const { toggleConfirmDialog } = useContext(ToggleEditFormContext);

  return (
    <>
      <div
        className="anim-transition top-0 left-0 w-full h-[100vh] bg-gray/10 fixed"
        onClick={toggleConfirmDialog}
      ></div>

      <div className="fixed w-[450px] max-sm:w-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white dark:bg-gray rounded shadow-xl py-6 px-9 z-50">
        <RiCloseFill
          className="text-xl bg-gray-500 rounded-full absolute top-2 right-2 cursor-pointer dark:bg-gray-800"
          onClick={toggleConfirmDialog}
        />
        <div className="flex flex-col gap-5">
          <Typography
            variant="h2"
            component="h3"
            theme="warning"
            className="font-semibold"
          >
            Attention
          </Typography>
          <Typography variant="body-sm" component="p">
            {message}
          </Typography>

          <div className="flex gap-4 justify-end mt-4">
            <Button variant="warning" size="small" action={action}>
              Oui
            </Button>
            <Button variant="outline" size="small" action={toggleConfirmDialog}>
              Non
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
