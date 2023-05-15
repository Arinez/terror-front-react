function SaveAnswer(answer: string) {
    return "200";
}

function updateCurrentHint(track: Track) {
    return track.currentHint = "Hint 2";

}

function FakeTrackRepository() {
    return {
        SaveAnswer
    }
}
export default FakeTrackRepository