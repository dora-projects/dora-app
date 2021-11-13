import React from "react";
import moment from "moment";
import { DatePicker, Form, Select } from "antd";
import { useFilterStore } from "@/pages/console/store/filterBar";
import { timeList } from "./common";
import { Bar } from "./styled";
import TagInput from "@/pages/console/components/FilterBar/TagInput";
import { useRequest } from "ahooks";
import { environmentList, releaseList } from "@/eql";
import { useConsoleProjectInfo } from "@/pages/console/store/project";
import { queryByEql } from "@/services/analysis";

const { RangePicker } = DatePicker;

const FilterBar = () => {
  const [form] = Form.useForm();
  const appKey = useConsoleProjectInfo((s) => s.project?.appKey);

  const { value, setFilters } = useFilterStore();

  // 表单恢复
  React.useEffect(() => {
    const { from, to, environment, release } = value || {};
    const range = from && to ? [moment(from), moment(to)] : null;
    form.setFieldsValue({ environment, release, range });
  }, [form, value]);

  const { data: releaseData } = useRequest(() => queryByEql({ eql: releaseList(appKey!) }));

  const releaseOptions = React.useMemo(() => {
    const releaseBuckets = releaseData?.data?.aggregations?.release?.buckets || [];
    return releaseBuckets.map((b: any) => ({ label: b.key, value: b.key }));
  }, [releaseData]);

  const { data: environmentData } = useRequest(() => queryByEql({ eql: environmentList(appKey!) }));

  const environmentOptions = React.useMemo(() => {
    const environmentBuckets = environmentData?.data?.aggregations?.environment?.buckets || [];
    return environmentBuckets.map((b: any) => ({ label: b.key, value: b.key }));
  }, [environmentData]);

  return (
    <Form
      form={form}
      initialValues={{
        tag: "today",
      }}
      onValuesChange={(val, allValues) => {
        // 调整时间 置空tag
        if (val.hasOwnProperty("range")) {
          form.setFieldsValue({
            tag: null,
          });
        }

        const { range } = allValues || {};
        let from = range && range?.[0]?.valueOf();
        let to = range && range?.[1]?.valueOf();

        // tag 优先级更高
        const { tag } = allValues;
        if (tag) {
          const item = timeList.find((t) => t.value === tag);
          const [tagFrom, tagTo] = item?.range() || [];
          from = tagFrom?.valueOf();
          to = tagTo?.valueOf();
        }

        setFilters({
          environment: allValues.environment,
          release: allValues.release,
          from,
          to,
        });
      }}
    >
      <Bar>
        <Form.Item name="environment" noStyle>
          <Select
            allowClear
            options={environmentOptions}
            placeholder="环境"
            style={{ width: "100px", marginRight: "20px" }}
          />
        </Form.Item>

        <Form.Item name="release" noStyle>
          <Select
            allowClear
            options={releaseOptions}
            placeholder="版本"
            style={{ width: "100px", marginRight: "20px" }}
          />
        </Form.Item>

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
      </Bar>
    </Form>
  );
};

export default FilterBar;
