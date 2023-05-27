// expected => '03/08/2022' => 2022-08-03
export const FormatDateUS = (value: string): string => {
  const [dia, mes, ano] = value.split('/');
  const montDate = `${ano}-${mes}-${dia}`;

  return montDate;
};
