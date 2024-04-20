import { Button } from "../../design-system/button/Button";
import { Typography } from "../../design-system/typography/Typography";

interface buttonPaginationProps {
  currentPage: number;
  totalPage?: number;
  onChangePage: (newPage: number) => void;
}
export function ButtonPagination({
  currentPage,
  totalPage,
  onChangePage,
}: buttonPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-7 mt-10">
      <Button
        action={() => onChangePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </Button>

      <Typography variant="caption1" component="p" className=" font-bold">
        Page {currentPage}
      </Typography>

      <Button
        action={() => onChangePage(currentPage + 1)}
        disabled={!totalPage || currentPage === totalPage}
      >
        Suivant
      </Button>
    </div>
  );
}
