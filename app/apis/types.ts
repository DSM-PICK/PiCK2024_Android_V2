// user
export interface IUserLoginIn {
  account_id: string;
  password: string;
  device_token: string;
}

export interface IUserLoginOut {
  access_token: string;
  refresh_token: string;
}

export type userProfileTypeIn = FormData;

export interface IUserSimple {
  user_name: string;
  grade: number;
  class_num: string;
  num: number;
  profile?: string | null;
}

export interface IUserDetails extends IUserSimple {
  birth_day: string;
  account_id: string;
}

// weekendMeal
export interface IWeekendMealPeriod {
  status: boolean;
  start: string;
  end: string;
}

export interface IWeekendMeal {
  status: "OK" | "NO";
}
export interface IWeekendMealPeriod {
  status: boolean;
  start: string;
  end: string;
}

export type weekendMealChangeStatusIn = "OK" | "NO";

// selfStudy
export type selfStudyType = Array<{ floor: number; teacher_name: string }>;

export type selfStudyMonthType = Array<{ floor: number; teacher_name: string; date: string }>;

// schedule
export type scheduleType = Array<{
  id: string;
  event_name: string;
  month: number;
  day: 0;
  day_name: string;
}>;

// notice
export type noticeSimpleType = Array<{
  id: string;
  title: string;
  create_at: string;
  teacher: string;
}>;

export interface INoticeDetail {
  title: string;
  content: string;
  create_at: string;
  teacher: string;
}

// meal
type mealType = {
  menu: string[];
  cal: string;
};

export interface IMeal {
  date: string;
  meal_list: {
    breakfast: mealType;
    lunch: mealType;
    dinner: mealType;
  };
}

// earlyReturn
export interface IEarlyReturnIn {
  reason: string;
  start: string;
}

export interface IEarlyReturnPass {
  user_name: string;
  teacher_name: string;
  start: string;
  reason: string;
  grade: number;
  class_num: number;
  num: number;
  type: "APPLICATION";
}

// classRoom
export interface IClassRoomPass {
  user_name: string;
  classroom: string;
  start: number;
  end: number;
}

export interface IClassRoomMoveIn extends Omit<IClassRoomPass, "user_name" | "classroom"> {
  floor: number;
  classroom_name: string;
}

// bug
export type bugFileTypeIn = FormData;

export interface IBugIn {
  title: string;
  content: string;
  file_name: string[];
  model: "ANDROID" | "IOS";
}

// application
export interface IApplicationIn {
  reason: string;
  start: string;
  end: string;
  application_type: "TIME" | "PERIOD";
}

export interface IApplicationPass {
  user_id: string;
  user_name: string;
  teacher_name: string;
  start: string;
  end: string;
  reason: string;
  profile: string;
  grade: number;
  class_num: number;
  num: number;
  type: "APPLICATION";
}

// timeTable
type timeTableType = {
  id: string;
  period: number;
  subject_name: string;
  image: string;
};

export type timeTableTodayType = {
  date: string;
  timetables: timeTableType[];
};

export type timeTableWeekType = timeTableTodayType[];
