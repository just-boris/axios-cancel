//expose 'cancel' classes to use it in dependencies
module.exports = {
    Cancellation: require('cancel/lib/Cancellation').default,
    CancellationError: require('cancel/lib/CancellationError').default
}
