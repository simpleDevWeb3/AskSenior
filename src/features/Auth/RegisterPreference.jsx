import { Selector } from "../../components/Selector";
import Spinner from "../../components/Spinner";
import { useTopic } from "./useTopic";

function RegisterPreference({ onChange }) {
  const { topics, isLoading } = useTopic();
  console.log(topics);

  const topicOptions = topics.map((t) => {
    return {
      label: t.name,
      subTopics: t.sub_topic.map((sub_t) => {
        return { label: sub_t.name, value: sub_t.id };
      }),
    };
  });

  if (isLoading) return <Spinner />;
  return (
    <>
      <h2>Add Interest Topics</h2>
      <p>Add up interested topic to recommendation</p>
      <br />
      <span>Topic </span>

      <Selector.Selected />
      <br />
      {topicOptions.map((topic) => (
        <Selector.Group key={topic.label} title={topic.label}>
          {topic.subTopics.map((sub) => (
            <Selector.Option
              key={sub.value}
              value={sub.value}
              onChange={onChange}
            >
              {sub.label}
            </Selector.Option>
          ))}
        </Selector.Group>
      ))}
    </>
  );
}

export default RegisterPreference;
