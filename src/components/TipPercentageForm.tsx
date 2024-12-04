const tipOptions = [
    {
        id: 'tip-10',
        value: .10,
        label: '10%'
    },
    {
        id: 'tip-20',
        value: .20,
        label: '20%'
    },
    {
        id: 'tip-50',
        value: .50,
        label: '50%'
    },
]

type TipPercentageFormProps = {
    setTip: React.Dispatch<React.SetStateAction<number>>,
    tip: number
}

export default function TipPercentageForm({ setTip, tip }: TipPercentageFormProps) {
    return (
        <div>
            <h3 className="font-black text-2xl">Propina:</h3>
            <form>
                {tipOptions.map(tipOption => (
                    <div key={tipOption.id} className="flex gap-2">
                        <label htmlFor={tipOption.id}>{tipOption.label}</label>
                        {/* nota: se sugiere utilizar el objeto event previendo no exista propiedad value(según curso pero no me queda claro) el signo + es para obligarlo a number pq es string*/}
                        <input id={tipOption.id}
                            name="tip" type="radio"
                            value={tipOption.value}
                            checked={tipOption.value === tip}
                            onChange={(e) => setTip(+e.target.value)} />
                        {/* <input id={tipOption.id} name="tip" type="radio" value={tipOption.value} onChange={() => setTip(tipOption.value)} /> */}
                    </div>))}

            </form>

        </div>
    )
}