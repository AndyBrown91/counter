function Settings(props) {
    let state = undefined;
    
    if ("state" in props.settings)
        state = JSON.parse(props.settings.getItem("state"));

    if (! state)
        state = {};

    let sections = [];

    for (let key in state) {
        console.log(key);
        sections.push(<Section title={<Text bold align="center">{key}</Text>} ></Section>);
    }

    return (
        <Page>
            <Section
                title={<Text bold align="center">Counter Settings</Text>}>
                {/* <Slider
                    label="Increment Amount"
                    settingsKey="incrementAmount"
                    min="1"
                    max="60"
                    onChange={(value) => {
                        console.log(value)
                    }}
                /> */}
                <TextInput
                    label="Increment Amount"
                    settingsKey="incrementAmount"
                    type="number"
                    placeholder="Enter A Number"
                />
                <Button
                    list
                    label="Clear Settings Storage"
                    onClick={() => props.settingsStorage.clear()}
                />
            </Section>
            { 
                sections
            }
        </Page>
    );
}

registerSettingsPage(Settings);
