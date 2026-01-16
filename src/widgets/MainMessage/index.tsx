import "./index.scss";

interface Props {
  hasData: boolean;
}

export const MainMessage = ({ hasData }: Props) => {
  if (hasData) {
    return (
      <h1 className="main__message-title XL">Актуальные данные с базы:</h1>
    );
  }

  return (
    <h1 className="main__message-title XL">
      Нет актуальных данных, попробуйте добавить!
    </h1>
  );
};
