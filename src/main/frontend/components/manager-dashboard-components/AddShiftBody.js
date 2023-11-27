import {
    Text,
    TouchableWithoutFeedback,
    View,
    StyleSheet,
    Keyboard,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Alert,
    Modal,
    StatusBar,
} from "react-native";
import React, {useState} from "react";
import MultiWheelPicker from "../MultiWheelPicker";
import CustomButton from "../CustomButton";
import {
    destructiveAction, clickableText,
    placeholderText,
    primaryGreen,
    secondaryGray,
    white, grayBackground
} from "../../utils/Colors";
import * as Haptics from "expo-haptics";
import WarnPopup from "./WarnPopup";
import {ipAddy} from "../../utils/IPAddress";
import {AddPopupStyles} from "../../utils/AddPopupStyles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const AddShiftBody = ({addShiftModal, setAddShiftModal, backPress, locationOptions, shiftOptions}) => {
    const warnText="This shift goes overnight. Are you sure you want to submit it?"
    const screenWidth = Dimensions.get('window').width;

    //shift type info
    const [shiftType, setShiftType] = useState(null);
    const shiftDropdownPress = (index) => {
        setShiftType(index);
    }

    //location info
    const [location, setLocation] = useState(null);
    const [locationId, setLocationId] = useState(null);
    const [isLocationError, setLocationError] = useState(false);
    let displayedLocations = locationOptions.map(a => a.locationName);

    const locationDropdownPress = (index) => {
        setLocation(index);
        for (let i = 0; i < locationOptions.length; i++) {
            if (location === locationOptions[i].locationName) {
                setLocationId(locationOptions[i].locationId);
                setLocationError(false);
            }
        }
    }

    //calendar info
    const [isCalendarVisible, setCalendarVisible] = useState(null);
    const handleCalendar = () => {
        setCalendarVisible(!isCalendarVisible);
    }

    //shift name info
    const [shiftName, setShiftName] = useState("");
    const [isShiftNameEmpty, setShiftNameEmpty] = useState(false);

    //repeats info
    const repeatsOptions = [
        {
            id: 0,
            text: 'Never',
        },
        {
            id: 1,
            text: 'Weekly',
        },
        {
            id: 2,
            text: 'Biweekly',
        },
        {
            id: 3,
            text: 'Monthly',
        },
    ];

    let displayedRepeats = repeatsOptions.map(a => a.text);
    const [selectedRepeats, setSelectedRepeats] = useState(null);
    const [repeatsID, setRepeatsID] = useState(null);

    const weekdays = [
        {
            key: 1,
            text: 'Mon',
        },
        {
            key: 2,
            text: 'Tue',
        },
        {
            key: 3,
            text: 'Wed',
        },
        {
            key: 4,
            text: 'Thu',
        },
        {
            key: 5,
            text: 'Fri',
        },
        {
            key: 6,
            text: 'Sat',
        },
        {
            key: 7,
            text: 'Sun',
        },
    ];

    const [weekdaysPressed, setWeekdaysPressed] = useState([]);
    const [noWeekdaysPressed, setNoWeekdaysPressed] = useState(false);

    const handleWeekdayPress = (index) => {
        setNoWeekdaysPressed(false);
        if (weekdaysPressed.includes(index)) {
            const newData = weekdaysPressed.filter((item) => item !== index);
            setWeekdaysPressed(newData);
        } else {
            const addDay = [index];
            setWeekdaysPressed([].concat(weekdaysPressed,addDay));
        }
    };

    const repeatsDropdownPress = (text) => {
        setSelectedRepeats(text);
        for (let i = 0; i < repeatsOptions.length; i++) {
            if (selectedRepeats === repeatsOptions[i].text) {
                setRepeatsID(repeatsOptions[i].id)
            }
        }
    }

    //number of shifts
    const [numShifts, setNumShifts] = useState("");
    const [numShiftsError, setNumShiftsError] = useState(false)

    //check all fields are filled
    const [warnModal, setWarnModal] = useState(false)
    const handleWarnVisible = () =>{
        setWarnModal(!warnModal)
    }

    const handleErrors = () => {
        let timeStart = startHour+(startMinute/100);
        let timeEnd = endHour+(endMinute/100);
        let noErrors= true;
        console.log('Selected repeats option: ', selectedRepeats);
        if (endPeriod === "PM") {
            timeEnd += 12;
        }
        if (startPeriod === "PM") {
            timeStart += 12;
        }
        if (locationOptions.length === 1) {
            setLocationId(locationOptions[0].locationId);
        }
        if (shiftOptions.length === 1) {
            setShiftType(shiftOptions[0]);
        }
        if (shiftName.trim() === '') {
            noErrors = false;
            Alert.alert (
                'Shift Name',
                'Please enter a shift name.',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else if (shiftType === 'Select Shift Type') {
            noErrors = false;
            Alert.alert (
                'Shift Type',
                'Please select a shift type.',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else if (location === 'Select Location') {
            noErrors = false;
            Alert.alert (
                'Location',
                'Please select a location.',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else if (!startDate) {
            noErrors = false;
            Alert.alert (
                'Date and Time',
                'Please select a start date.',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else if (!endDate) {
            noErrors = false;
            Alert.alert (
                'Date and Time',
                'Please select an end date.',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else if (endDate < startDate) {
            noErrors = false;
            Alert.alert (
                'Date and Time',
                'End date cannot occur before start date.',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else if (!startTime) {
            noErrors = false;
            Alert.alert (
                'Date and Time',
                'Please select a start time.',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }  else if (!endTime) {
            noErrors = false;
            Alert.alert (
                'Date and Time',
                'Please select an end time.',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else if (selectedRepeats === null) {
            noErrors = false;
            Alert.alert (
                'Repeats',
                'Please select how often shift repeats.',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        } else if (selectedRepeats !== 'Never') {
            if (weekdaysPressed.length === 0) {
                noErrors = false;
                Alert.alert (
                    'Repeats',
                    'Please select days on which shift repeats.',
                    [
                        {
                            text: 'OK',
                            style: 'default',
                        }
                    ]
                );
                Haptics.notificationAsync(
                    Haptics.NotificationFeedbackType.Error
                );
            }
        } else if (!numShifts) {
            noErrors = false;
            Alert.alert (
                'Number of Shifts',
                'Please enter how many shifts to create.',
                [
                    {
                        text: 'OK',
                        style: 'default',
                    }
                ]
            );
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }
        if (noErrors) {
            if (endTime < startTime || endDate > startDate) {
                Alert.alert (
                    'Overnight Shift',
                    'Are you sure you want to create an overnight shift?',
                    [
                        {
                            text: 'Create',
                            style: 'default',
                            onPress: handleShiftAdd,
                        },
                        {
                            text: 'Cancel',
                            style: 'cancel',
                        }
                    ]
                );
            } else {
                handleShiftAdd();
            }
        }
    }

    //post to Mongo
    const handleShiftAdd = () => {
        setWarnModal(false);
        const weekdays = weekdaysPressed.sort();
        const isEndPeriod = (endPeriod === "AM");
        const isStartPeriod = (startPeriod === "AM");
        console.log(isEndPeriod);
        console.log(isStartPeriod);
        fetch('http://' + ipAddy + ':8080/createShifts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                shiftType: shiftType,
                endDate: endDate,
                daysOfWeek: weekdays,
                endHour: endHour,
                shiftName: shiftName,
                startHour: startHour,
                isEndAM: isEndPeriod,
                locationId: locationId,
                isStartAM: isStartPeriod,
                startMinute: startMinute,
                startDate: startDate,
                endMinute: endMinute,
                repeatsEvery: repeatsID,
                numberOfShifts: numShifts,
            }),
        }).then(res => res.json()
        ).then(json => {
            console.log(json.message)
        })
            .catch(error => {
                console.error(error);
            });
        backPress();
    }

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [startDate, setStartDate] = useState(null);

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };

    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };

    const handleStartDateConfirm = (date) => {
        const formattedStartDate = moment(date).format('MM/DD/YYYY');
        setStartDate(formattedStartDate);
        console.warn("A start date has been picked: ", moment(date).format('MM/DD/YYYY'));
        hideStartDatePicker();
    };

    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [endDate, setEndDate] = useState(null);

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const handleEndDateConfirm = (date) => {
        const formattedEndDate = moment(date).format('MM/DD/YYYY');
        setEndDate(formattedEndDate);
        console.warn("An end date has been picked: ", formattedEndDate);
        hideEndDatePicker();
    };

    const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [startHour, setStartHour] = useState(null);
    const [startMinute, setStartMinute] = useState(null);
    const [startPeriod, setStartPeriod] = useState(null);

    const showStartTimePicker = () => {
        setStartTimePickerVisibility(true);
    };

    const hideStartTimePicker = () => {
        setStartTimePickerVisibility(false);
    };

    const handleStartTimeConfirm = (time) => {
        const formattedTime = moment(time).format('h:mm A');
        const hour = moment(formattedTime, 'h:mm A').hour();
        const min = moment(formattedTime, 'h:mm A').minute();
        const period = moment(time).format('a');
        setStartTime(formattedTime);
        setStartHour(hour);
        setStartMinute(min);
        setStartPeriod(period);
        hideStartTimePicker();
    };

    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
    const [endTime, setEndTime] = useState(null);
    const [endHour, setEndHour] = useState(null);
    const [endMinute, setEndMinute] = useState(null);
    const [endPeriod, setEndPeriod] = useState(null);

    const showEndTimePicker = () => {
        setEndTimePickerVisibility(true);
    };

    const hideEndTimePicker = () => {
        setEndTimePickerVisibility(false);
    };

    const handleEndTimeConfirm = (time) => {
        const formattedTime = moment(time).format('h:mm A');
        const hour = moment(formattedTime, 'h:mm A').hour();
        const min = moment(formattedTime, 'h:mm A').minute();
        const period = moment(time).format('a');
        setEndTime(formattedTime);
        setEndHour(hour);
        setEndMinute(min);
        setEndPeriod(period);
        hideEndTimePicker();
    };

    const closeModal = () => {
        setAddShiftModal(!addShiftModal);
    }

    return(
        <View>
            <Modal
                animationType="slide"
                visible={addShiftModal}
                presentationStyle={"pageSheet"}
            >
                <StatusBar
                    barStyle={'light-content'}
                    animated={true}
                    showHideTransition={'fade'}
                />
                <View style={styles.modalContainer}>
                <View style={styles.modalHeader}>
                    <TouchableOpacity
                        onPress={closeModal}
                    >
                        <Text style={{fontSize: 21, color: white}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
        <KeyboardAwareScrollView
            keyboardDismissMode={"interactive"}
            contentContainerStyle={[AddPopupStyles.modal, {flex: 1}, {height: "100%"}, {marginTop: 50}]}
            // resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}
        >
            <Text style={styles.sectionTitle}>Add Shift</Text>
            <TextInput
                style={[styles.inputText, isShiftNameEmpty ? styles.errorBorder : null]}
                onChangeText={(shiftName) =>{
                    setShiftName(shiftName)
                    setShiftNameEmpty(false)
                }}
                value={shiftName}
                placeholder={"Shift Name"}
                placeholderTextColor={placeholderText}
            />
            <Text style={styles.sectionSubtitle}>Shift Type</Text>
            <View style={[AddPopupStyles.dropdownContainer]}>
                {shiftOptions.length === 1 &&
                    <View>
                        <Text style={[styles.normalText, {color: clickableText}]}>{shiftOptions[0]}</Text>
                    </View>
                }
                {shiftOptions.length !== 1 &&
                    <View style={styles.doubleContainer}>
                        <MultiWheelPicker
                            wheelData={shiftOptions}
                            selectedItem={shiftType}
                            setSelectedItems={shiftDropdownPress}
                            placeholder={"Select Shift Type"}
                            wide={screenWidth/1.2}
                            hasChevron={true}
                        />
                    </View>
                }
            </View>
            <Text style={styles.sectionSubtitle}>Location</Text>
            <View style={[AddPopupStyles.dropdownContainer, isLocationError ? AddPopupStyles.destructiveAction:{}]}>
                {displayedLocations.length === 1 &&
                    <View>
                        <Text style={[styles.normalText, {color: clickableText}]}>{locationOptions[0].locationName}</Text>
                    </View>
                }
                {displayedLocations.length !== 1 &&
                    <MultiWheelPicker
                        wheelData={displayedLocations}
                        setSelectedItems={locationDropdownPress}
                        selectedItem={location}
                        placeholder={"Select Location"}
                        wide={screenWidth/1.2}
                        hasChevron={true}
                    />
                }
            </View>
            <Text style={styles.sectionSubtitle}>Date and Time</Text>
            <View style={styles.dateTimeContainer}>
                <TouchableOpacity onPress={showStartDatePicker}>
                <View style={styles.dateTimeRow}>
                    <Text style={styles.normalText}>Start Date</Text>
                    <Text style={[styles.normalText, {color: clickableText}]}>
                        {startDate !== null ? startDate : 'Not selected'}
                    </Text>
                </View>
                <DateTimePickerModal
                    isVisible={isStartDatePickerVisible}
                    mode="date"
                    onConfirm={handleStartDateConfirm}
                    onCancel={hideStartDatePicker}
                    themeVariant={"light"}
                    display={"inline"}
                />
                </TouchableOpacity>
                <TouchableOpacity onPress={showEndDatePicker}>
                    <View style={styles.dateTimeRow}>
                        <Text style={styles.normalText}>End Date</Text>
                        <Text style={[styles.normalText, {color: clickableText}]}>
                            {endDate !== null ? endDate : 'Not selected'}
                        </Text>
                    </View>
                    <DateTimePickerModal
                        isVisible={isEndDatePickerVisible}
                        mode="date"
                        onConfirm={handleEndDateConfirm}
                        onCancel={hideEndDatePicker}
                        themeVariant={"light"}
                        display={"inline"}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={showStartTimePicker}>
                    <View style={styles.dateTimeRow}>
                        <Text style={styles.normalText}>Start Time</Text>
                        <Text style={[styles.normalText, {color: clickableText}]}>
                            {startTime !== null ? startTime : 'Not selected'}
                        </Text>
                    </View>
                    <DateTimePickerModal
                        isVisible={isStartTimePickerVisible}
                        mode="time"
                        onConfirm={handleStartTimeConfirm}
                        onCancel={hideStartTimePicker}
                        themeVariant={"light"}
                        display={"spinner"}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={showEndTimePicker}>
                    <View style={[styles.dateTimeRow, {borderBottomWidth: 0}]}>
                        <Text style={styles.normalText}>End Time</Text>
                        <Text style={[styles.normalText, {color: clickableText}]}>
                            {endTime !== null ? endTime : 'Not selected'}
                        </Text>
                    </View>
                    <DateTimePickerModal
                        isVisible={isEndTimePickerVisible}
                        mode="time"
                        onConfirm={handleEndTimeConfirm}
                        onCancel={hideEndTimePicker}
                        themeVariant={"light"}
                        display={"spinner"}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.sectionSubtitle}>Repeats</Text>
            <View style={[AddPopupStyles.dropdownContainer]}>
                <MultiWheelPicker
                    wheelData={displayedRepeats}
                    setSelectedItems={repeatsDropdownPress}
                    selectedItem={selectedRepeats}
                    placeholder={"Select Option"}
                    wide={screenWidth/1.2}
                    hasChevron={true}
                />
            </View>
            <View style={[styles.dayContainer, noWeekdaysPressed ? AddPopupStyles.destructiveAction:{}]}>
                {weekdays.map(day  =>
                    <TouchableWithoutFeedback onPress={() => handleWeekdayPress(day.key)} key={day.key}>
                        <View
                            style={[weekdaysPressed.includes(day.key) ?
                                {backgroundColor: primaryGreen}
                                : {backgroundColor: white},
                                styles.dayBox,
                            ]}
                        >
                            <Text style={[!weekdaysPressed.includes(day.key) ?
                                {color: clickableText}
                                : {color: white},
                                {fontSize: 17}]}
                            >
                                {day.text}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>

                )}
            </View>
            <TextInput
                style={[styles.inputText, isShiftNameEmpty ? styles.errorBorder : null]}
                onChangeText={(numShifts)=> {
                    setNumShifts(numShifts)
                    setNumShiftsError(false)
                }}
                value={numShifts}
                placeholder={'Number of Shifts'}
                placeholderTextColor={placeholderText}
                keyboardType = 'numeric'
            />
            <View style={styles.addShiftButton}>
                <CustomButton
                    buttonText={"Add Shift"}
                    handlePress={handleErrors}
                    color={primaryGreen}
                    textColor={white}
                />
            </View>
            <WarnPopup
                handleModalVisible={handleWarnVisible}
                isModalVisible={warnModal}
                submitForm={handleShiftAdd}
                titleText={warnText}/>
        </KeyboardAwareScrollView>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    modalHeader: {
        height: 50,
        backgroundColor: primaryGreen,
        marginBottom: 50,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: grayBackground,
    },
    titleContainer: {
        width: '100%',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    sectionTitle: {
        marginBottom: 6,
        width: '100%',
        fontSize: 36,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    sectionSubtitle: {
        marginBottom: 6,
        width: '100%',
        fontSize: 21,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    inputText: {
        width: "100%",
        fontSize: 18,
        //fontFamily: 'HelveticaNeue-Medium',
        padding: 12,
        marginBottom: 18,
        backgroundColor: white,
        borderRadius: 10,
    },
    normalText: {
        fontSize: 18,
    },
    errorBorder: {
        borderWidth: 1,
        borderColor: destructiveAction,
    },
    doubleContainer: {
        padding: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    shortContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "100%",
    },
    dayContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        marginBottom: 18,
        width: "100%",
        backgroundColor: secondaryGray,
        borderRadius: 7,
        paddingVertical: 4,
        paddingHorizontal: 4,
        overflow: 'hidden',
    },
    dayBox: {
        borderRadius: 7,
        paddingVertical: 4,
        paddingHorizontal: 8,
        marginHorizontal: 2,
    },
    input: {
        width: "100%",
        height: 30,
        fontSize: 24,
        margin: 5,
    },
    dateTimeContainer: {
        backgroundColor: white,
        width: "100%",
        borderRadius: 10,
        flexDirection: "column",
        paddingLeft: 12,
        marginBottom: 18,
    },
    dateTimeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        paddingLeft: 0,
        borderBottomWidth: 0.25,
        borderBottomColor: secondaryGray,
    },
})

export default AddShiftBody