var cellList = {
    GrassCell: require('./GrassCell'),
    ShieldCell: require('./ShieldCell'),
    RockCell: require('./RockCell'),
    SwordCell: require('./SwordCell'),
    AcidCell: require('./AcidCell'),
    BackDeflectorCell: require('./BackDeflectorCell'),
    ForwardDeflectorCell: require('./ForwardDeflectorCell'),
    FlimsyBackDeflectorCell: require('./FlimsyBackDeflectorCell'),
    FlimsyForwardDeflectorCell: require('./FlimsyForwardDeflectorCell'),
    TrampolineCell: require('./TrampolineCell'),
    WeakTrampolineCell: require('./WeakTrampolineCell'),
    LoadCell: require('./LoadCell'),
    UnloadCell: require('./UnloadCell'),
    PeekCell: require('./PeekCell'),
    PushCell: require('./PushCell'),
    PullCell: require('./PullCell'),
    ShaveCell: require('./ShaveCell'),
    GrowCell: require('./GrowCell'),
    MorphCell: require('./MorphCell'),
    NinjaCell: require('./NinjaCell'),
    PeacefulNinjaCell: require('./PeacefulNinjaCell'),
    SenseiCell: require('./SenseiCell'),
    PirateCell: require('./PirateCell'),
    CaptainCell: require('./CaptainCell'),
    GateCell: require('./GateCell'),
    AccountantCell: require('./AccountantCell'),
    AddCell: require('./AddCell'),
    SubtractCell: require('./SubtractCell'),
    MultiplyCell: require('./MultiplyCell'),
    DivideCell: require('./DivideCell'),
    SineCell: require('./SineCell'),
    CosineCell: require('./CosineCell'),
    TangentCell: require('./TangentCell'),
    ArcsineCell: require('./ArcsineCell'),
    ArcosineCell: require('./ArcosineCell'),
    ArctangentCell: require('./ArctangentCell'),
    NuclearBombCell: require('./NuclearBombCell')
};

var cellTypes = {
    names: {},
    classes: cellList
};

for (var className in cellList) {
    if (!cellList.hasOwnProperty(className)) continue;

    var cellClass = cellList[className];
    cellTypes.names[cellClass.type] = className;
}

module.exports = cellTypes;