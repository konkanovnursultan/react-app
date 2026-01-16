import { useState } from "react";
import { RemoveIcon } from "../icons/RemoveIcon";
import "./index.scss";

interface Props {
  value: string[];
  onChange: (skills: string[]) => void;
}

export const InputSkillsUI = ({ value, onChange }: Props) => {
  const [input, setInput] = useState("");

  const addSkill = () => {
    if (!input.trim()) return;
    if (value.includes(input)) return;

    onChange([...value, input.trim()]);
    setInput("");
  };

  const removeSkill = (skill: string) => {
    onChange(value.filter((s) => s !== skill));
  };

  return (
    <section className="skills__wrapper flex flex-col items-start justify-start">
      <label className="skills__wrapper-label Small">Ваши Навыки</label>
      <input
        value={input}
        placeholder="Например, React.js"
        onChange={(e) => setInput(e.target.value)}
        className="skills__wrapper-input flex flex-row items-center justify-start Small"
      />
      <section className="skills__wrapper-add flex wrap items-start justify-start">
        <button
          type="button"
          onClick={addSkill}
          className="skills__wrapper-add_button flex items-center justify-center Small"
        >
          Добавить
        </button>
        {value.map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => removeSkill(skill)}
            className="skills__wrapper-add_skill flex flex-row items-center justify-center Small"
          >
            <div className="skills__wrapper-add_icon flex items-center justify-center">
              <RemoveIcon />
            </div>
            {skill}
          </button>
        ))}
      </section>
    </section>
  );
};
