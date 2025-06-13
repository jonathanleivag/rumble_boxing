"use server";

import { CreateSchedule, Difficulty, ISchedulesData, Schedules } from "@/type";
import { connectToMongoDB } from "../mongoose";
import { Schedules as SchedulesModel } from "../models/schedules.model";

export const createSchedule = async (
  scheduleData: Schedules
): Promise<CreateSchedule> => {
  await connectToMongoDB();
  const schedule = await SchedulesModel.findOne({ name: scheduleData.name });

  if (schedule) {
    throw new Error("El horario ya existe");
  }

  const schedules = await SchedulesModel.find();

  if (schedules.length >= 4) {
    throw new Error("No se pueden crear más de 4 horarios");
  }

  const newSchedule = new SchedulesModel(scheduleData);
  const data = await newSchedule.save();

  const scheduleResponse: ISchedulesData = await SchedulesModel.findById(
    data._id
  ).populate("classes.class");

  if (!scheduleResponse) {
    throw new Error("Error al crear el horario");
  }

  const serializedSchedule = {
    _id: scheduleResponse._id.toString(),
    name: scheduleResponse.name,
    description: scheduleResponse.description,
    color: scheduleResponse.color,
    classes: scheduleResponse.classes.map((cls) => {
      return {
        class: {
          _id: cls.class._id.toString(),
          name: String(cls.class.name),
          duration: Number(cls.class.duration),
          difficulty: cls.class.difficulty,
          description: String(cls.class.description),
          createdAt: String(cls.class.createdAt),
          updatedAt: String(cls.class.updatedAt),
        },
        startTime: String(cls.startTime),
        endTime: String(cls.endTime),
      };
    }),
    createdAt: scheduleResponse.createdAt.toString(),
    updatedAt: scheduleResponse.updatedAt.toString(),
  };

  return JSON.parse(JSON.stringify(serializedSchedule));
};

export const getSchedules = async (): Promise<CreateSchedule[]> => {
  await connectToMongoDB();
  const schedules: ISchedulesData[] = await SchedulesModel.find().populate(
    "classes.class"
  );
  if (!schedules) {
    throw new Error("Error al obtener los horarios");
  }

  return schedules.map((schedule) => {
    return {
      _id: schedule._id.toString(),
      name: schedule.name,
      description: schedule.description,
      color: schedule.color,
      classes: schedule.classes.map((cls) => {
        return {
          class: {
            _id: cls.class._id.toString(),
            name: String(cls.class.name),
            duration: Number(cls.class.duration),
            difficulty: cls.class.difficulty as Difficulty,
            description: String(cls.class.description),
            createdAt: String(cls.class.createdAt),
            updatedAt: String(cls.class.updatedAt),
          },
          startTime: String(cls.startTime),
          endTime: String(cls.endTime),
        };
      }),
      createdAt: schedule.createdAt.toString(),
      updatedAt: schedule.updatedAt.toString(),
    };
  });
};

export const deleteSchedule = async (id: string): Promise<void> => {
  await connectToMongoDB();
  const schedule = await SchedulesModel.findByIdAndDelete(id);
  if (!schedule) {
    throw new Error("Error al eliminar el horario");
  }
};

export const updateSchedule = async (
  id: string,
  scheduleData: Schedules
): Promise<CreateSchedule> => {
  await connectToMongoDB();
  const schedule: ISchedulesData = await SchedulesModel.findByIdAndUpdate(
    id,
    scheduleData,
    {
      new: true,
    }
  ).populate("classes.class");

  if (!schedule) {
    throw new Error("Error al actualizar el horario");
  }

  const serializedSchedule = {
    _id: schedule._id.toString(),
    name: schedule.name,
    description: schedule.description,
    color: schedule.color,
    classes: schedule.classes.map((cls) => {
      return {
        class: {
          _id: cls.class._id.toString(),
          name: String(cls.class.name),
          duration: Number(cls.class.duration),
          difficulty: cls.class.difficulty,
          description: String(cls.class.description),
          createdAt: String(cls.class.createdAt),
          updatedAt: String(cls.class.updatedAt),
        },
        startTime: String(cls.startTime),
        endTime: String(cls.endTime),
      };
    }),
    createdAt: schedule.createdAt.toString(),
    updatedAt: schedule.updatedAt.toString(),
  };
  return JSON.parse(JSON.stringify(serializedSchedule));
};
