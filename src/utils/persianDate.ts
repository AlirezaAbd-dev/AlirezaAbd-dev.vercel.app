import moment from 'jalali-moment';

export function gregorianToSolar(
  date: string,
  format: string | undefined = 'YYYY,MM,DD',
) {
  moment.locale('Fa');
  const newMoment = moment.from(date, 'en', 'YYYY,MM,DD').format(format);

  return newMoment;
}
