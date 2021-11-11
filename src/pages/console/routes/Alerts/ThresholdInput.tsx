import React, { useState } from "react";
import { Select, InputNumber, Input } from "antd";

type TimeUnit = "minute" | "hour";
type Operator = ">" | "<";

const timeUnitOptions = [
  {
    label: "分钟内",
    value: "minute",
  },
  {
    label: "秒内",
    value: "second",
  },
];

const operatorOptions = [
  {
    label: "大于",
    value: ">",
  },
  {
    label: "小于",
    value: "<",
  },
];

export interface ThresholdValue {
  time?: number;
  timeUnit?: TimeUnit;
  operator?: Operator;
  quota?: number;
}

interface ThresholdInputProps {
  value?: ThresholdValue;
  onChange?: (value: ThresholdValue) => void;
}

const ThresholdInput: React.FC<ThresholdInputProps> = ({ value = {}, onChange }) => {
  const [time, setTime] = useState<number | undefined>(undefined);
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("minute");

  const [operator, setOperator] = useState<Operator>(">");
  const [quota, setQuota] = useState<number | undefined>(undefined);

  const triggerChange = (changedValue: { time?: number; timeUnit?: TimeUnit; operator?: Operator; quota?: number }) => {
    onChange?.({ time, timeUnit, operator, quota, ...value, ...changedValue });
  };

  return (
    <Input.Group compact>
      <InputNumber
        min={0}
        value={value.time || time}
        onChange={(e) => {
          if (!("time" in value)) {
            setTime(e);
          }
          triggerChange({ time: e });
        }}
        placeholder="时间"
        style={{ width: 80 }}
      />
      <Select
        value={value?.timeUnit || timeUnit}
        options={timeUnitOptions}
        style={{ width: 95 }}
        onChange={(v) => {
          if (!("timeUnit" in value)) {
            setTimeUnit(v);
          }
          triggerChange({ timeUnit: v });
        }}
      />
      <Select
        value={value?.operator || operator}
        options={operatorOptions}
        style={{ width: 80 }}
        onChange={(v) => {
          if (!("operator" in value)) {
            setOperator(v);
          }
          triggerChange({ operator: v });
        }}
      />
      <InputNumber
        min={0}
        value={value?.quota || quota}
        onChange={(v) => {
          if (!("quota" in value)) {
            setQuota(v);
          }
          triggerChange({ quota: v });
        }}
        placeholder="数量"
        style={{ width: 80 }}
      />
    </Input.Group>
  );
};

export default ThresholdInput;
