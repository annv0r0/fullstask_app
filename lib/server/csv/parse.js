'use server';
import { parse } from 'csv-parse';

export async function parseCSV(stream) {
  const parser = stream.pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
      trim: true,
    })
  );

  const rows = [];
  for await (const r of parser) {
    rows.push({
      // article: r.article
      article: `${Date.now()}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      title: r.title,
      description: r.description,
      weight: r.weight,
      unit: r.unit,
      price: r.price,
      availible: r.availible,
      raiting: r.raiting,
      image: r.image,
      date: r.date ? new Date(r.date) : new Date(),
    });
  }

  return rows;
}
