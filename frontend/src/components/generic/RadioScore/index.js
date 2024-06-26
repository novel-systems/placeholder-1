import { FormControl, FormLabel, Radio, RadioGroup } from '@material-ui/core'
import { toInteger, includes } from 'lodash-es'
import React, { useState } from 'react'
import placeholderStyle from '@/utils/styles'

const scoreArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default ({ category, label, onSelectionChange, value = null }) => {
    const classes = placeholderStyle()
    const [selectedValue, setSelectedValue] = useState(value)
    const [selectedIndex, setSelectedIndex] = useState(null)

    if (value && selectedIndex === null && includes(scoreArray, value)) {
        setSelectedIndex(scoreArray.indexOf(value))
    }

    const handleChange = index => {
        setSelectedIndex(index)
    }

    return (
        <FormControl component="fieldset" className="tw-w-full" required>
            <FormLabel
                component="legend"
                className="tw-mb-4 tw-tracking-tight tw-font-medium tw-text-black tw-text-base"
            >
                {label}
            </FormLabel>
            <RadioGroup
                aria-label={category}
                name={category}
                value={selectedValue}
                onChange={e => {
                    setSelectedValue(toInteger(e.target.value))
                    onSelectionChange(toInteger(e.target.value))
                }}
                className="tw-flex tw-flex-row tw-gap-2"
            >
                {scoreArray.map((score, index) => (
                    <Radio
                        key={index}
                        checked={score === selectedValue}
                        onChange={() => handleChange(index)}
                        value={score}
                        className="tw-p-0"
                        checkedIcon={
                            <div className="tw-flex tw-items-center tw-justify-center tw-bg-gray-300 tw-w-8 tw-h-8 tw-rounded-full">
                                <span
                                    className={`tw-w-5 tw-h-5 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-text-sm tw-font-bold tw-text-white ${classes.bgPrimary}`}
                                >
                                    {score}
                                </span>
                            </div>
                        }
                        icon={
                            index < selectedIndex ? (
                                <div className="tw-flex tw-items-center tw-justify-center tw-bg-gray-300 tw-w-8 tw-h-8 tw-rounded-full">
                                    <span
                                        className={`tw-w-5 tw-h-5 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-text-sm tw-text-gray-400 ${classes.bgPrimary}`}
                                    >
                                        {score}
                                    </span>
                                </div>
                            ) : (
                                <span
                                    className={`tw-flex tw-justify-center tw-items-center tw-text-sm ${classes.icon}`}
                                >
                                    {score}
                                </span>
                            )
                        }
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}
