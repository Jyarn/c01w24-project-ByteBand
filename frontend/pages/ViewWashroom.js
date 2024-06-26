import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import AddRatings from "./addRatings";
import DisplayRatings from "./displayRatings";
import { SERVER_URL } from "../constants/constants";

function parseOpenTimes(id, key, openTimes, bolden) {
  const weight = {fontWeight: bolden ? "bold" : "normal"};
  if (openTimes[key].length == 0) {
    return (
      <View key={id} style={styles.closedContainer}>
        <Text style={[styles.day, weight]}>{key}</Text>
        <Text style={[styles.time, weight]}>Closed</Text>
      </View>
    );
  } else {
    let ret = [];
    for (var i = 0; i != openTimes[key].length; i++) {
      ret.push(
        <View style={[styles.openSubContainer]} key={i}>
          <Text style={[styles.day, weight]}>{key}</Text>
          <Text style={[styles.time, weight]}>{`${openTimes[key][i].start} -- ${openTimes[key][i].end}`}</Text>
        </View>
      );
    }

    return <View style={styles.openContainer} key={id}>{ret}</View>
  }
}

function parseContact(id, key, contacts) {
  return (
    <View key={id}>
      <Text style={[styles.openButtonText, {marginRight: 60}]}>{key}</Text>
      <Text style={[styles.openButtonText, {marginBottom: 8, marginRight: 60}]} onPress={() => {
        Linking.canOpenURL(contacts[key].link).then((openable) => {
          if (openable)
            Linking.openURL(contacts[key].link);
          else
            console.log("ERROR: unable to open URL " + contacts[key].link);
        })}}>
          {contacts[key].text}
      </Text>
    </View>
  );
}

const ViewWashroom = ({ route }) => {
  const [status, setStatus] = useState(null);
  const [response, setResponse] = useState(null);
  const [displayTimes, setDisplayTimesFlag] = useState(null);
  const [ratings, setRatings] = useState(null);

  const washroomId = route.params.washroomId;
  const currentDate = new Date("Wed Mar 27 2024 17:06:22");

  useEffect(() => {
    getSchedule();
  }, []);

  const getSchedule = async () => {
    const res = await fetch(`${SERVER_URL}/getWashroomInfo/${washroomId}?day=${currentDate.getDay()}&hr=${currentDate.getHours()}&min=${currentDate.getMinutes()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setStatus(res.status);
    const doc = await res.json();
    setResponse(doc);
    setRatings(doc.ratings);
  };

  if (status == null || response == null) {
    return (
      <View><Text>Loading...</Text></View>
    );
  } else if (status != 200) {
    return (
      <View><Text>Error: {response.error}</Text></View>
    );
  } else {
    const parsedSchedule = [];
    let id = 0;
    const daymap = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    for (const key in response.openTimes) {
      parsedSchedule.push(parseOpenTimes(id++, key, response.openTimes, daymap[currentDate.getDay()] === key));
    }

    const parsedContacts = [];
    for (const key in response.contact) {
      parsedContacts.push(parseContact(id++, key, response.contact));
    }

    return (
      <ScrollView>
        <View style={styles.mainContainer}>
          {response.name ?
            <Text style={{fontSize: 32}}>{response.name}</Text>
           : []}

          {response.address ?
            <View style={[styles.iconContainer]}>
              <Image
                style={styles.icon}
                source={require("../images/googlemap_location_pin.png")}/>
              <Text style={styles.location}>{response.address}</Text>
            </View>
          :
           []}

          <TouchableOpacity
            style={[styles.iconContainer, styles.iconContainerSpacing]}
            onPress={() => setDisplayTimesFlag(!displayTimes)}>
            <Image
              style={styles.icon}
              source={require("../images/googlemap_time_icon.png")}
            />
            <Text style={styles.openButtonText}>
              {response.useSchedule ?
                response.open != null ? "Open" : "Closed"
                :
                response.overrideStatus ? "Open" : "Closed"}
            </Text>
            <Text style={[styles.openButtonText, {marginLeft: 20}]}>
              {response.useSchedule && response.open != null ?
                `${response.open.start} -- ${response.open.end}`
               :
                "           "}
            </Text>
            <Image
              style={[styles.icon, {marginLeft: 90, marginRight: 60}]}
              source={displayTimes ? require("../images/dropdown_collapsed.png") : require("../images/dropdown_normal.png")}
            />
            </TouchableOpacity>

          {displayTimes ? parsedSchedule : []}

          {response.contact ?
            <View style={[styles.iconContainer, styles.iconContainerSpacing]}>
              <Image
                style={styles.icon}
                source={require("../images/googlemap_contact_icon.png")}
              />
              <View>
                {parsedContacts}
              </View>
            </View>
           :
            []}
        </View>
        <AddRatings setRatingsCallback={setRatings} washroomId={washroomId} />
        <DisplayRatings rating={ratings} />
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    justifyContent: "center",
  },
  openContainer: {
    marginTop: 10,
    marginLeft: 8,
  },
  openSubContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closedContainer: {
    marginTop: 10,
    marginLeft: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  location: {
    fontSize: 20,
    marginRight: 60,
  },
  time: {
    fontSize: 16,
    marginRight: 20,
  },
  day: {
    fontSize: 16,
  },
  openButtonText: {
    fontSize: 18,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginRight: 16,
  },
  iconContainer: {
    flexDirection: "row",
  },
  iconContainerSpacing: {
    marginTop: 16,
  }
});

export default ViewWashroom;
