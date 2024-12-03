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
    setTip: React.Dispatch<React.SetStateAction<number>>
}

export default function TipPercentageForm({ setTip }: TipPercentageFormProps) {
    return (
        <div>
            <h3 className="font-black text-2xl">Propina:</h3>
            <form>
                {tipOptions.map(tip => (
                    <div key={tip.id} className="flex gap-2">
                        <label htmlFor={tip.id}>{tip.label}</label>
                        {/* nota: se sugiere utilizar el objeto event previendo no exista propiedad value(según curso pero no me queda claro) el signo + es para obligarlo a number pq es string*/}
                        <input id={tip.id} name="tip" type="radio" value={tip.value} onChange={(e) => setTip(+e.target.value)} />
                        {/* <input id={tip.id} name="tip" type="radio" value={tip.value} onChange={() => setTip(tip.value)} /> */}
                    </div>))}

            </form>

        </div>
    )
}