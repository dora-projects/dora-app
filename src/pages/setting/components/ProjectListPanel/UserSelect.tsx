import React from "react";
import { Select, Avatar, Spin } from "antd";
import { useRequest, useControllableValue } from "ahooks";
import { searchUsers } from "@/services/user";

const { Option } = Select;

interface Props {
  value: any;
  onChange: (v: any) => void;
}

const UserSelect = (props: Props) => {
  const [value, setValue] = useControllableValue(props);

  const {
    data: userRes,
    run: searchUser,
    loading,
  } = useRequest((d: string) => searchUsers(d), {
    manual: true,
    throttleInterval: 300,
  });

  const userList = userRes?.data;
  console.log(userList);

  return (
    <Select
      style={{ width: "300px" }}
      mode="multiple"
      value={value}
      filterOption={false}
      notFoundContent={loading ? <Spin size="small" /> : null}
      placeholder="请选择待添加的成员"
      onSearch={(txt) => {
        return searchUser(txt);
      }}
      onChange={(e) => {
        setValue(e);
      }}
    >
      {Array.isArray(userList) &&
        userList.map((user: any) => {
          return (
            <Option key={user.id} label={user.username} value={user.id}>
              <Avatar size="small">{user?.username?.slice(0, 1)}</Avatar> <b>{user.username}</b>（{user.email}）
            </Option>
          );
        })}
    </Select>
  );
};

export default UserSelect;
