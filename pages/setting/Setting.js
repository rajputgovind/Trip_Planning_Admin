import React, { useEffect, useState } from "react";
import Image from "next/image";

import { useRouter } from "next/router";
import {
  getAllSettings,
  changeSettingsData,
} from "../../components/apiservice";
import closeIcon from "../../public/close-icon.svg";
import Modal from "react-modal";

import cookie from "js-cookie";

import { AiOutlineEdit } from "react-icons/ai";

function Setting() {
  const [isLoading, setLoaderState] = useState(false);
  const router = useRouter();
  const [settingsData, setSettingsData] = useState({
    price: false,
    duration: false,
    groupType: false,
    tripType: false,
  });
  const [changeSettings, setChangeSettings] = useState({
    price: false,
    duration: false,
    groupType: false,
    tripType: false,
  });
  const [modalIsOpenEdit, setIsOpenEdit] = React.useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "450px",
      width: "500px",
    },
  };
  function closeModalEdit() {
    setIsOpenEdit(false);
  }
  useEffect(() => {
    let token = cookie.get("token");
    if (token) {
      getAllSettings(
        token,
        setLoaderState,
        router,
        setSettingsData,
        settingsData,
        setChangeSettings,
        changeSettings
      );
    } else {
      router.push("/login-page");
    }
  }, []);
  const changeSettingInfo = () => {
    let token = cookie.get("token");
    if (token) {
      changeSettingsData(
        token,
        setLoaderState,
        router,
        changeSettings,
        setSettingsData,
        settingsData,
        setChangeSettings
      );

      setIsOpenEdit(false);
    } else {
      router.push("/login-page");
    }
  };
  return (
    <>
      <div className="main-content-box">
        <div className="flex heading text-xl mb-4">
          Settings
          <AiOutlineEdit
            className="cursor-pointer"
            onClick={() => {
              setIsOpenEdit(true);
            }}
          />
        </div>
        <hr className="mt-6 mb-6" />
        {isLoading === true ? (
          <div className="loader-box">
            <div className="loader"></div>
          </div>
        ) : (
          ""
        )}
        <div className="container mx-auto">
          <div className="flex-container flex-wrap justify-between grid gap-1 mb-5">
            <div className="w-2/3">
              <div className="">
                <div className="table text-gray">
                  <table className="user-table w-full text-sm text-left ">
                    <tbody className="settings-table">
                      <tr className="bg-white border-b ">
                        <td className="py-4 px-6">Price</td>
                        <td className="py-4 px-6 text-right">
                          {" "}
                          {settingsData?.price ? "True" : "False"}
                        </td>
                      </tr>

                      <tr className="bg-white border-b ">
                        <td className="py-4 px-6"> Duration</td>
                        <td className="py-4 px-6 text-right">
                          {" "}
                          {settingsData?.duration ? "True" : "False"}
                        </td>
                      </tr>
                      <tr className="bg-white border-b ">
                        <td className="py-4 px-6"> Group Type</td>
                        <td className="py-4 px-6 text-right">
                          {" "}
                          {settingsData?.groupType ? "True" : "False"}
                        </td>
                      </tr>
                      <tr className="bg-white border-b ">
                        <td className="py-4 px-6">Trip Type</td>
                        <td className="py-4 px-6 text-right">
                          {" "}
                          {settingsData?.tripType ? "True" : "False"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={modalIsOpenEdit}
          onRequestClose={closeModalEdit}
          style={customStyles}
        >
          <p className="flex justify-content-between p-2 text-left text-gray-700 text-xl mb-4">
            <span className="flex item-center gap-1 ">
              <span>Edit Settings </span>
            </span>
            <div className="flex justify-center">
              <Image
                unoptimized
                onClick={closeModalEdit}
                className="cursor-pointer"
                alt="close"
                src={closeIcon}
              />
            </div>
          </p>
          <hr className="mt-6 mb-6" />

          <div className="flex flex-col items-center justify-center">
            <form className="w-96 p-6 bg-white rounded-lg shadow-md">
              <label className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  defaultChecked={changeSettings.price}
                  onChange={(e) => {
                    setChangeSettings({
                      ...changeSettings,
                      price: !changeSettings.price,
                    });
                  }}
                />
                <span>Price</span>
              </label>
              <label className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  defaultChecked={changeSettings.duration}
                  onChange={() =>
                    setChangeSettings({
                      ...changeSettings,
                      duration: !changeSettings.duration,
                    })
                  }
                />
                <span>Duration</span>
              </label>
              <label className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  defaultChecked={changeSettings.groupType}
                  onChange={() =>
                    setChangeSettings({
                      ...changeSettings,
                      groupType: !changeSettings.groupType,
                    })
                  }
                />
                <span>Group Type</span>
              </label>
              <label className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  defaultChecked={changeSettings.tripType}
                  onChange={() =>
                    setChangeSettings({
                      ...changeSettings,
                      tripType: !changeSettings.tripType,
                    })
                  }
                />
                <span>Trip Type</span>
              </label>
            </form>
          </div>

          <div className="modal-btn flex justify-center mt-6">
            <button
              type="button"
              className="primary-bg p-4 text-white btn-add font-semibold"
              onClick={() => {
                changeSettingInfo();
              }}
            >
              {isLoading && <div className="loader loader-img"></div>}
              Save
            </button>

            <button
              className="white-bg p-4 primary-text btn-add font-semibold"
              type="button"
              onClick={() => {
                closeModalEdit();
              }}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Setting;
