import axios from "axios";
import cookie from "js-cookie";
import { toast } from "react-toastify";

export const loginFunction = async (email, password, setLoading, router) => {
  try {
    setLoading(true);
    let loginInfo = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
      {
        email: email,
        password: password,
      }
    );

    cookie.set("token", loginInfo?.data?.token);
    setLoading(false);
    toast.success("login Successfully");
    router.push("/");
  } catch (err) {
    setLoading(false);
    if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    }
  }
};

export const getAllUsers = async (
  token,
  setLoaderState,
  router,
  setuserInfo,
  currentPage,
  setPageCount,
  setLimit,
  searchKeyWord
) => {
  try {
    if (!searchKeyWord) {
      setLoaderState(true);
    }

    let url = "";
    if (searchKeyWord) {
      url = `${process.env.NEXT_PUBLIC_BASE_URL}/users/get-all-users?page=${currentPage}&search=${searchKeyWord}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_BASE_URL}/users/get-all-users?page=${currentPage}`;
    }
    let userInformation = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLoaderState(false);
    setuserInfo(userInformation?.data?.data?.docs);
    setPageCount(userInformation?.data?.data?.totalDocs);
    setLimit(userInformation?.data?.data?.limit);
  } catch (err) {
    setLoaderState(false);
    console.log("err", err);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const getAllOrganizers = async (
  token,
  setLoaderState,
  router,
  setorganizerInfo,
  currentPage,
  setPageCount,
  setLimit,
  searchKeyWord
) => {
  try {
    if (!searchKeyWord) {
      setLoaderState(true);
    }
    let url = "";
    if (searchKeyWord) {
      url = `${process.env.NEXT_PUBLIC_BASE_URL}/organizers/get-all-organizers?page=${currentPage}&search=${searchKeyWord}`;
    } else {
      url = `${process.env.NEXT_PUBLIC_BASE_URL}/organizers/get-all-organizers?page=${currentPage}`;
    }
    let organizerInformation = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLoaderState(false);
    setorganizerInfo(organizerInformation?.data?.data?.docs);
    setPageCount(organizerInformation?.data?.data?.totalDocs);
    setLimit(organizerInformation?.data?.data?.limit);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const toggleChangeFunctionApi = async (
  token,
  setLoaderState,
  router,
  setorganizerInfo,
  currentPage,
  setPageCount,
  setLimit,
  searchKeyWord,
  id,
  status
) => {
  try {
    setLoaderState(true);
    let toggleChange = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/admins/approve-organizer/${id}`,
      { status: status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getAllOrganizers(
      token,
      setLoaderState,
      router,
      setorganizerInfo,
      currentPage,
      setPageCount,
      setLimit,
      searchKeyWord
    );
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const deleteUserOrganizerFunction = async (
  token,
  setLoaderState,
  id,
  role,
  router,
  setorganizerInfo,
  currentPage,
  setPageCount,
  setLimit,
  searchKeyWord,
  setIsOpenDelete
) => {
  try {
    setLoaderState(true);
    let deleteUser = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (role === "user") {
      getAllUsers(
        token,
        setLoaderState,
        router,
        setorganizerInfo,
        currentPage,
        setPageCount,
        setLimit,
        searchKeyWord
      );
    } else if (role === "organizer") {
      getAllOrganizers(
        token,
        setLoaderState,
        router,
        setorganizerInfo,
        currentPage,
        setPageCount,
        setLimit,
        searchKeyWord
      );
    }

    setIsOpenDelete(false);
    toast.success(deleteUser?.data?.message);
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const getAllSettings = async (
  token,
  setLoaderState,
  router,
  setSettingsData,
  settingsData,
  setChangeSettings,
  changeSettings
) => {
  try {
    setLoaderState(true);
    let getSettingsData = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/filters/get-all-filters`
    );

    setSettingsData({
      ...settingsData,
      duration: getSettingsData?.data?.data?.duration,
      groupType: getSettingsData?.data?.data?.groupType,
      price: getSettingsData?.data?.data?.price,
      tripType: getSettingsData?.data?.data?.tripType,
    });
    setChangeSettings({
      ...changeSettings,
      duration: getSettingsData?.data?.data?.duration,
      groupType: getSettingsData?.data?.data?.groupType,
      price: getSettingsData?.data?.data?.price,
      tripType: getSettingsData?.data?.data?.tripType,
    });
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const changeSettingsData = async (
  token,
  setLoaderState,
  router,
  changeSettings,
  setSettingsData,
  settingsData,
  setChangeSettings
) => {
  try {
    setLoaderState(true);
    let changeSettingsInformation = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/filters/apply-filter`,
      changeSettings,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getAllSettings(
      token,
      setLoaderState,
      router,
      setSettingsData,
      settingsData,
      setChangeSettings,
      changeSettings
    );
    toast.success("Settings Updated Successfully");
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const getProfile = async (
  token,
  setLoaderState,
  router,
  setEmail,
  setAdminInfo,
  adminInfo
) => {
  try {
    setLoaderState(true);
    let adminProfile = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/get-single-user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    let newDate = new Date(adminProfile?.data?.data?.birthDate)
      .toISOString()
      .split("T")[0];
    setEmail(adminProfile?.data?.data?.email);
 
    setAdminInfo({
      ...adminInfo,
      name: adminProfile?.data?.data?.name,
      birthDate: newDate,
      phone: adminProfile?.data?.data?.phone,
    });

    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const changeProfile = async (
  token,
  setLoaderState,
  router,
  setEmail,
  setAdminInfo,
  adminInfo,
  password,
  setProfileState,
  profileState

) => {
  try {
    setLoaderState(true);
    let newObj = {};

    newObj.name = adminInfo?.name;

    newObj.phone = adminInfo?.phone;

    newObj.birthDate = adminInfo?.birthDate;

    if (password) {
      newObj.password = password;
    }
    let changeProfileInformation = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/update`,
      newObj,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getProfile(
      token,
      setLoaderState,
      router,
      setEmail,
      setAdminInfo,
      adminInfo
    );
    newObj = {};
    setProfileState(!profileState)
    toast.success("Profile Updated Successfully");
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);

    getProfile(
      token,
      setLoaderState,
      router,
      setEmail,
      setAdminInfo,
      adminInfo
    );
    if (err?.response?.data?.errMessages) {
      if (err?.response?.data?.errMessages[0]?.phone) {
        toast.error(err?.response?.data?.errMessages[0]?.phone);
      } else if (err?.response?.data?.errMessages[0]?.name) {
        toast.error(err?.response?.data?.errMessages[0]?.name);
      } else if (err?.response?.data?.errMessages[0]?.birthDate) {
        toast.error(err?.response?.data?.errMessages[0]?.birthDate);
      } else if (err?.response?.data?.errMessages[0]?.password) {
        toast.error(err?.response?.data?.errMessages[0]?.password);
      }
    } else if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const getAllTrips = async (
  token,
  setLoaderState,
  router,
  setTripData,
  tripData,
  currentPage,
  setPageCount,
  setLimit,
  searchKeyWord,

  selectedOptionPrice,
  selectedOptionDuration,
  selectedOptionType,
  selectedOptionGroupType
) => {
  try {
    let min = "",
      max = "";
    if (selectedOptionPrice) {
      (min = selectedOptionPrice?.split("-")[0]),
        (max = selectedOptionPrice?.split("-")[1]);
    }

    if (
      !searchKeyWord &&
      !selectedOptionPrice &&
      !selectedOptionDuration &&
      !selectedOptionType &&
      !selectedOptionGroupType
    ) {
      setLoaderState(true);
    }

    let tripInfo = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trips/get-all-trips?page=${currentPage}&search=${searchKeyWord}&duration=${selectedOptionDuration}&tripType=${selectedOptionGroupType}&maxPrice=${max}&minPrice=${min}&groupType=${selectedOptionType}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setTripData(tripInfo?.data?.data?.docs);
    setPageCount(tripInfo?.data?.data?.totalDocs);
    setLimit(tripInfo?.data?.data?.limit);
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
export const getSingleTrip = async (token, setLoaderState, router) => {
  try {
    // setLoaderState(true);
    let tripInfo = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trips/get-single-trip/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setTripData(tripInfo?.data?.data?.docs);
    setPageCount(tripInfo?.data?.data?.totalDocs);
    setLimit(tripInfo?.data?.data?.limit);
    setLoaderState(false);
  } catch (err) {
    setLoaderState(false);
    if (err?.response?.data?.message === "unAuthorized") {
      router.push("/login-page");
    } else if (err?.response?.data?.message) {
      toast.error(err?.response?.data?.message);
    } else {
      toast.error("Something went wrong");
    }
  }
};
