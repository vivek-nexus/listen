import Select, { CSSObjectWithLabel } from 'react-select'

export function VoicesDropdown() {
    const options =
        [
            {
                label: "English voices",
                options:
                    [
                        {
                            label: "English Voice 1",
                            value: "english voice 1",
                            isNatural: true
                        },
                        {
                            label: "English Voice 2",
                            value: "english voice 2"
                        }
                    ]
            },
            {
                label: "All other voices",
                options: [
                    {
                        label: "Non English Voice 1",
                        value: "non english voice 1"
                    },
                    {
                        label: "Non English Voice 2 Non English Voice 2",
                        value: "non english voice 2",
                        isNatural: true
                    },
                    {
                        label: "Non English Voice 2",
                        value: "non english voice 3"
                    },
                    {
                        label: "Non English Voice 2",
                        value: "non english voice 4"
                    },
                    {
                        label: "Non English Voice 2",
                        value: "non english voice 5"
                    },
                    {
                        label: "Non English Voice 2",
                        value: "non english voice 6"
                    },

                ]
            }
        ]

    function formattedOption(data: any) {
        console.log(data)
        return (
            <div className="flex items-center justify-between">
                <span>{data.label}</span>
                {data.hasOwnProperty("isNatural") &&
                    <span className="ml-2 px-3 py-1 text-xs bg-primary-800/30 text-white/70 rounded-full">NATURAL</span>
                }
            </div>
        )
    }

    function formattedGroupLabel(data: any) {
        console.log(data)
        return (
            <div className="text-sm text-center">
                <span>{data.label}</span>
            </div>
        )
    }

    return (

        <Select
            isSearchable={true}
            placeholder="Default voice"
            options={options}
            classNamePrefix="voices-dropdown"
            formatGroupLabel={formattedGroupLabel}
            formatOptionLabel={formattedOption}
            noOptionsMessage={() => {
                return (
                    <span>No voices available on your device</span>
                )
            }}
            styles={{
                control: (base: CSSObjectWithLabel, state) => ({
                    ...base,
                    backgroundColor: "var(--primary-800-20)",
                    borderColor: `${state.isFocused ? "var(--primary-800)" : "var(--primary-800-50)"}`,
                    boxShadow: "none",
                    borderRadius: "32px",
                    padding: "0px 2px",
                    ":hover": {
                        borderColor: "var(--primary-800)",
                    },
                    ":active": {
                        borderColor: "var(--primary-800)",
                    },
                    cursor: "pointer",
                }),
                input: (base) => ({
                    ...base,
                    color: "var(--white-70)",
                }),
                singleValue: (base: CSSObjectWithLabel) => ({
                    ...base,
                    color: "var(--white-70)",
                }),
                dropdownIndicator: (base: CSSObjectWithLabel) => ({
                    ...base,
                    color: "var(--primary-800)",
                }),
                indicatorSeparator: (base: CSSObjectWithLabel) => ({
                    ...base,
                    backgroundColor: "var(--primary-800)",
                }),
                container: (base: CSSObjectWithLabel) => ({
                    ...base,
                    backgroundColor: "transparent",
                }),
                menuList: (base: CSSObjectWithLabel) => ({
                    ...base,
                    padding: "0px",
                }),
                menu: (base: CSSObjectWithLabel) => ({
                    ...base,
                    color: "var(--primary-800)",
                    overflow: "clip",
                    backgroundColor: `var(--black-40)`,
                    borderRadius: "8px",
                    border: "2px var(--primary-800-50) solid",
                    backdropFilter: "blur(8px)",
                    boxShadow: "var(--shadow-menu-container-glow)",
                    padding: "0px",
                    maxHeight: "300px",
                    transition: "all 0.5s linear",
                }),
                group: (base: CSSObjectWithLabel) => ({
                    ...base,
                    color: "var(--primary-800)",
                    padding: "0px",
                    marginBottom: "16px",
                }),
                groupHeading: (base: CSSObjectWithLabel) => ({
                    ...base,
                    color: "var(--white-70)",
                    padding: "8px",
                    backgroundColor: "var(--group-heading-bg)",
                    border: "none",
                    borderWidth: "2px 0px",
                    position: "sticky",
                    top: "0px",
                }),
                // Not able to understand what is the right type for state. Setting it to OptionProps<any, false, any> doesn't work. 
                option: (base: CSSObjectWithLabel, state: any) => ({
                    ...base,
                    transition: "color 0.2s",
                    color: state.isSelected ? "var(--white-70)" : "var(--primary-800)",
                    backgroundColor: state.isSelected && "var(--primary-800-80)",
                    ":hover": {
                        color: "var(--white-70)",
                    },
                    ":active": {
                        backgroundColor: "var(--primary-800-60)",
                    },
                    ":focus": {
                        backgroundColor: "var(--primary-800-40)",
                    },
                    cursor: "pointer"
                }),

            }}
        />
    )
}