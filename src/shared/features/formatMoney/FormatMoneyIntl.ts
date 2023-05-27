// expected: => 1000 ou 10,00 => 'R$ 10,00'
export const FormatMoney = (value?: string) => {
  const replace1 = value?.replace(/\D/g, '');
  const replace2 = replace1?.replace(/(\d)(\d{2})$/, '$1,$2');
  return replace2?.replace(/(?=(\d{3})+(\D))\B/g, '.');
};

// expected: => 10 => 'R$ 10,00' ... expected = '10338.74' => output '10.338,74'
export const formatarDinheiro = (value: number | bigint) => new Intl.NumberFormat('pt-BR', {
  style: 'decimal',
  minimumFractionDigits: 2,
}).format(value);
