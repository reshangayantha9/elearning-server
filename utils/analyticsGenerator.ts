import { Document, Model, model } from "mongoose";

interface MonthDate {
  month: string;
  count: number;
}

// export async function generateLast12MonthsDate<T extends Document>(
//   model: Model<T>
// ): Promise<{ last12Months: MonthDate[] }> {
//   const last12Months: MonthDate[] = [];
//   const currentDate = new Date();
//   currentDate.setDate(currentDate.getDate() + 1);

//   for (let i = 1; i >= 0; i--) {
//     const endDate = new Date(
//       currentDate.getFullYear(),
//       currentDate.getMonth(),
//       currentDate.getDate() - i * 28
//     );
//     const startDate = new Date(
//       endDate.getFullYear(),
//       endDate.getMonth(),
//       endDate.getDate() - 28
//     );

//     const monthYear = endDate.toLocaleString("default", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//     const count = await model.countDocuments({
//       createdAt: {
//         $gte: startDate,
//         $lt: endDate,
//       },
//     });
//     last12Months.push({ month: monthYear, count });
//   }
//   return { last12Months };
// }

export async function generateLast12MonthsDate<T extends Document>(
    model: Model<T>
  ): Promise<{ last12Months: MonthDate[] }> {
    const last12Months: MonthDate[] = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
  
    for (let i = 0; i < 12; i++) {  // Change the loop condition
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,  // Adjust the month calculation
        currentDate.getDate()
      );
      const startDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth() - 1,
        endDate.getDate()
      );
  
      const monthYear = endDate.toLocaleString("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
      const count = await model.countDocuments({
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      });
      last12Months.push({ month: monthYear, count });
    }
    return { last12Months };
  }
  