import React from "react";
import moment from "moment";
import { useControllableValue, useRequest } from "ahooks";
import { DatePicker, Form, Select } from "antd";
import { timeList } from "./common";
import { Bar } from "./styled";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { queryFiledOptions } from "@/services/analysis";
import TagInput from "@/components/FilterBar/TagInput";
import { useParams } from "react-router";

const { RangePicker } = DatePicker;

interface Props {
  value?: UrlFilter;
  onChange?: (v: UrlFilter) => void;
}

const FilterBar = (props: Props) => {
  const [form] = Form.useForm();
  const params = useParams();
  const appKey = params?.appKey;

  const [filterVal, setFilters] = useControllableValue(props);

  // 表单恢复
  React.useEffect(() => {
    const { from, to, environment, release, tag } = filterVal || {};
    const range = from && to ? [moment(from), moment(to)] : null;
    form.setFieldsValue({ environment, release, range, tag });
  }, [form, filterVal]);

  const { data: releaseData } = useRequest(() =>
    queryFiledOptions({
      field: "release",
      appKey: appKey!,
    })
  );

  const releaseOptions = React.useMemo(() => {
    const releaseBuckets = releaseData?.data || [];
    return releaseBuckets.map((b: any) => ({ label: b.key, value: b.key }));
  }, [releaseData]);

  const { data: environmentData } = useRequest(() =>
    queryFiledOptions({
      field: "environment",
      appKey: appKey!,
    })
  );

  const environmentOptions = React.useMemo(() => {
    const environmentBuckets = environmentData?.data || [];
    return environmentBuckets.map((b: any) => ({ label: b.key, value: b.key }));
  }, [environmentData]);

  return (
    <Form
      form={form}
      onValuesChange={(val, allValues) => {
        let tag = allValues.tag;

        // 调整时间 置空tag
        if (val.hasOwnProperty("range")) {
          tag = null;
          form.setFieldsValue({
            tag: null,
          });
        }

        const { range } = allValues || {};
        let from = range && range?.[0]?.valueOf();
        let to = range && range?.[1]?.valueOf();

        // tag 优先级更高
        if (val.tag) {
          const item = timeList.find((t) => t.value === val.tag);
          const [tagFrom, tagTo] = item?.range() || [];
          from = tagFrom?.valueOf();
          to = tagTo?.valueOf();
        }

        setFilters({
          tag,
          environment: allValues.environment,
          release: allValues.release,
          from,
          to,
        });
      }}
    >
      <Bar>
        <div>
          <Form.Item name="environment" noStyle>
            <Select
              allowClear
              options={environmentOptions}
              placeholder="环境"
              style={{ width: "150px", marginRight: "20px" }}
            />
          </Form.Item>

          <Form.Item name="release" noStyle>
            <Select
              allowClear
              options={releaseOptions}
              placeholder="版本"
              style={{ width: "200px", marginRight: "20px" }}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item name="range" noStyle>
            <RangePicker
              allowClear={false}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [moment("00:00:00", "HH:mm:ss"), moment("23:59:59", "HH:mm:ss")],
              }}
              disabledDate={(currentDate) => moment().add(1, "day").startOf("day").isBefore(currentDate)}
              format="YYYY/MM/DD HH:mm:ss"
            />
          </Form.Item>

          <Form.Item name="tag" noStyle>
            <TagInput />
          </Form.Item>
        </div>
      </Bar>
    </Form>
  );
};

export default FilterBar;
