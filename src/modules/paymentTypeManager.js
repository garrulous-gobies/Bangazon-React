import APIManager from './APIManager'

const paymentTypeManager = new APIManager('paymentType')

export default {

    getPaymentTypes() {
        return paymentTypeManager.all()
    },

    getSinglePaymentType(id) {
        return paymentTypeManager.get(id)
    },

    newPaymentType(postItem) {
        return paymentTypeManager.post(postItem).then(() => this.getPaymentTypes()
        )
    },

    updatePaymentType(item, id) {
        return paymentTypeManager.put(item, id).then(() => this.getPaymentTypes()
        )
    },

    deletePaymentType(id) {
        return paymentTypeManager.delete(id)
    }    

}