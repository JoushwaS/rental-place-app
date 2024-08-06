import {
    Model,
    Document,
    FilterQuery,
    QueryOptions,
    UpdateQuery,
    PipelineStage,
    Aggregate,
} from 'mongoose'

const ModelFunctions = <TDocument extends Document>(
    model: Model<TDocument>
) => {
    const create = async (values: Partial<TDocument>) => {
        const doc = await model.create(values)
        return doc._id.toString()
    }

    const exists = async (
        filterValue: FilterQuery<TDocument>
    ): Promise<boolean> => !!(await model.exists(filterValue))

    const findOne = async (
        filterQuery: FilterQuery<Partial<TDocument>>,
        options: QueryOptions<Partial<TDocument>> = {}
    ): Promise<Partial<TDocument> | null> =>
        await model.findOne(filterQuery, undefined, options).lean()

    const findOneAndUpdate = async (
        filterQuery: FilterQuery<Partial<TDocument>>,
        values: UpdateQuery<Partial<TDocument>>,
        options: QueryOptions<Partial<TDocument>> = {}
    ): Promise<Partial<TDocument> | null> =>
        await model
            .findOneAndUpdate(filterQuery, values, { ...options, new: true })
            .lean()

    const findAll = async (
        filterObj: FilterQuery<Partial<TDocument>>,
        options: QueryOptions<Partial<TDocument>> = {}
    ): Promise<TDocument[] | []> =>
        await model.find(filterObj, undefined, options)

    const deleteObj = async (
        filterObj: FilterQuery<Partial<TDocument>>,
        options: QueryOptions<Partial<TDocument>> = {}
    ): Promise<boolean> =>
        (await model.findOneAndDelete(filterObj, options).exec()) != null

    const aggregate = async (
        pipeline: PipelineStage[]
    ): Promise<Aggregate<TDocument>[]> => {
        return await model.aggregate(pipeline).exec()
    }

    const countDoc = async (
        filterObj: FilterQuery<Partial<TDocument>>
    ): Promise<number> => await model.countDocuments(filterObj).exec()

    return {
        create,
        exists,
        findOne,
        findOneAndUpdate,
        findAll,
        deleteObj,
        aggregate,
        countDoc,
    }
}

export default ModelFunctions
