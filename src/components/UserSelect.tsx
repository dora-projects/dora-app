import React from "react";
import { Select, Avatar, Spin, Space } from "antd";
import { useRequest, useControllableValue } from "ahooks";
import { searchUsers } from "@/services/user";

const { Option } = Select;

interface Props {
  value?: any;
  onChange?: (v: any) => void;
}

const UserSelect = (props: Props) => {
  const [value, setValue] = useControllableValue(props);

  const {
    data: userRes,
    run: searchUser,
    loading,
  } = useRequest((d: string) => searchUsers(d), {
    throttleWait: 300,
  });

  const userList = userRes?.data;

  return (
    <Select
      style={{ width: "300px" }}
      mode="multiple"
      value={value}
      notFoundContent={loading ? <Spin size="small" /> : null}
      placeholder="搜索成员"
      filterOption={(v, option) => {
        const label = option?.label as string;
        return label.indexOf(v) > -1;
      }}
      // filterOption={false}
      // onSearch={(txt) => {
      //   return searchUser(txt);
      // }}
      onChange={(e) => {
        setValue(e);
      }}
    >
      {Array.isArray(userList) &&
        userList.map((user: any) => {
          return (
            <Option key={user.id} label={user.username + user.email} value={user.id}>
              <Space>
                <Avatar size={18}>{user?.username?.slice(0, 1)}</Avatar>
                <b>{user.username}</b>({user.email})
              </Space>
            </Option>
          );
        })}
    </Select>
  );
};

export default UserSelect;
