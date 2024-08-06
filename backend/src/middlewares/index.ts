import Joi from 'joi'
import { validateRequest } from './common.middleware'
import { NextFunction, Request, Response } from 'express'
import { ClientStaus } from '../types'

export const addCandidateApplicationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        resumeUrl: Joi.string().required(),
        phoneNo: Joi.string().required(),
        jobPosition: Joi.string().optional(),
        currentSalary: Joi.string().optional(),
        expectedSalary: Joi.string().optional(),
        expectedJoinedDate: Joi.string().optional(),
        linkedInUrl: Joi.string().optional(),
        githubUrl: Joi.string().optional(),
        jobOpeningId: Joi.string().optional(),
        aboutCandidate: Joi.string().optional(),
        education: Joi.string().optional(),
    })
    validateRequest({ req, res, next, schema })
}

export const addJobOpeningMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().optional(),
        salaryRange: Joi.string().optional(),
        location: Joi.string().optional(),
        notes: Joi.string().optional(),
        isActive: Joi.boolean().optional(),
        status: Joi.string().optional(),
        jobDetails: Joi.string().required(),
    })

    validateRequest({ req, res, next, schema })
}

export const updateJobOpeningMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        salaryRange: Joi.string().optional(),
        location: Joi.string().optional(),
        notes: Joi.string().optional(),
        isActive: Joi.boolean().optional(),
        status: Joi.string().optional(),
        jobDetails: Joi.string().optional(),
    })

    validateRequest({ req, res, next, schema })
}

export const addClientMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().optional().allow(null, ''),
        email: Joi.string().email().required(),
        phoneNo: Joi.string().optional().allow(null, ''),
        businessName: Joi.string().optional().allow(null, ''),
        country: Joi.string().optional().allow(null, ''),
        message: Joi.string().optional().allow(null, ''),
        route: Joi.string().optional().allow(null, ''),
        timeSlot: Joi.string().optional().allow(null, ''),

        // for spam protection
        firstNamehidden: Joi.string().optional().allow(null, ''),
        lastNamehidden: Joi.string().optional().allow(null, ''),
        emailhidden: Joi.string().optional().allow(null, ''),
        phoneNohidden: Joi.string().optional().allow(null, ''),
        businessNamehidden: Joi.string().optional().allow(null, ''),
        countryhidden: Joi.string().optional().allow(null, ''),
        messagehidden: Joi.string().optional().allow(null, ''),
        routehidden: Joi.string().optional().allow(null, ''),
        timeSlothidden: Joi.string().optional().allow(null, ''),
    })

    validateRequest({ req, res, next, schema })
}

export const updateClientMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        email: Joi.string().email().optional(),
        phoneNo: Joi.string().optional(),
        businessName: Joi.string().optional(),
        country: Joi.string().optional(),
        message: Joi.string().optional(),
        route: Joi.string().optional(),
        timeSlot: Joi.string().optional(),
        clientBudget: Joi.string().optional(),
        adminNotes: Joi.string().optional(),
        isSpam: Joi.boolean().optional(),
        status: Joi.string()
            .valid(...Object.values(ClientStaus))
            .required(),
    })
    validateRequest({ req, res, next, schema })
}

const detailSchemaObj = {
    descriptionMetaTitle: Joi.string().optional(),
    descriptionMetaDescription: Joi.string().optional(),
    descriptionBody: Joi.object().optional(),
    descriptionBody2: Joi.object().optional(),
}

export const addServiceMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        metaTitle: Joi.string().optional(),
        metaDescription: Joi.string().optional(),
        canonicalUrl: Joi.string().optional(),
        iconUrl: Joi.string().optional(),
        images: Joi.array().items(Joi.string()).optional(),
        rating: Joi.number().optional().min(0).max(5),
        body: Joi.object().optional(),
        ppcPage: Joi.boolean().optional(),
        slug: Joi.string().required(),
        isVisible: Joi.boolean().optional(),
        relatedProjects: Joi.array().items(Joi.string()).optional(),

        ...detailSchemaObj,
    })

    validateRequest({ req, res, next, schema })
}

export const updateServiceMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        name: Joi.string().optional(),
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        metaTitle: Joi.string().optional(),
        metaDescription: Joi.string().optional(),
        canonicalUrl: Joi.string().optional(),
        iconUrl: Joi.string().optional(),
        images: Joi.array().items(Joi.string()).optional(),
        rating: Joi.number().optional().min(0).max(5),
        body: Joi.object().optional(),
        ppcPage: Joi.boolean().optional(),
        slug: Joi.string().optional(),
        isVisible: Joi.boolean().optional(),
        relatedProjects: Joi.array().items(Joi.string()).optional(),

        ...detailSchemaObj,
    })

    validateRequest({ req, res, next, schema })
}

export const addIndustryMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        metaTitle: Joi.string().optional(),
        metaDescription: Joi.string().optional(),
        canonicalUrl: Joi.string().optional(),
        iconUrl: Joi.string().optional(),
        tag: Joi.string().optional(),
        image: Joi.string().optional(),
        rating: Joi.number().optional().min(0).max(5),
        ppcPage: Joi.boolean().optional(),
        slug: Joi.string().required(),
        isVisible: Joi.boolean().optional(),
        otherIndustries: Joi.array().items(Joi.string()).optional(),
        ...detailSchemaObj,
    })

    validateRequest({ req, res, next, schema })
}

export const updateIndustryMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        name: Joi.string().optional(),
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        metaTitle: Joi.string().optional(),
        metaDescription: Joi.string().optional(),
        canonicalUrl: Joi.string().optional(),
        iconUrl: Joi.string().optional(),
        tag: Joi.string().optional(),
        image: Joi.string().optional(),
        rating: Joi.number().optional().min(0).max(5),
        ppcPage: Joi.boolean().optional(),
        slug: Joi.string().optional(),
        isVisible: Joi.boolean().optional(),
        otherIndustries: Joi.array().items(Joi.string()).optional(),
        ...detailSchemaObj,
    })

    validateRequest({ req, res, next, schema })
}

export const addNewsLetterMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
    })
    validateRequest({ req, res, next, schema })
}

export const addGalleryMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        url: Joi.string().required(),
        description: Joi.string().optional(),
        type: Joi.string().optional(),
        rating: Joi.number().optional().min(0).max(5),
        isVisible: Joi.boolean().optional(),
    })

    validateRequest({ req, res, next, schema })
}

export const updateGalleryMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        name: Joi.string().optional(),
        url: Joi.string().optional(),
        description: Joi.string().optional(),
        type: Joi.string().optional(),
        rating: Joi.number().optional().min(0).max(5),
        isVisible: Joi.boolean().optional(),
    })

    validateRequest({ req, res, next, schema })
}

// case study middlware
export const addCaseStudyMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        isVisible: Joi.boolean().optional(),
        title: Joi.string().required(),
        description: Joi.string().optional(),
        name: Joi.string().optional(),
        metaTitle: Joi.string().optional(),
        metaDescription: Joi.string().optional(),
        canonicalUrl: Joi.string().optional(),
        body1: Joi.object().optional(),
        body2: Joi.object().optional(),
        type: Joi.string().optional(),
        image: Joi.string().optional(),
        category: Joi.array().items(Joi.string()).optional(),
        slug: Joi.string().required(),
        tags: Joi.string().optional(),
        rating: Joi.number().optional().min(0).max(5),
        ppcPage: Joi.boolean().optional(),
        descriptionMetaTitle: Joi.string().optional(),
        descriptionMetaDescription: Joi.string().optional(),
        // addedByUser: Joi.string().optional(),
    })

    validateRequest({ req, res, next, schema })
}

export const updateCaseStudyMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const schema = Joi.object({
        isVisible: Joi.boolean().optional(),
        title: Joi.string().optional(),
        name: Joi.string().optional(),
        metaTitle: Joi.string().optional(),
        metaDescription: Joi.string().optional(),
        description: Joi.string().optional(),
        descriptionMetaTitle: Joi.string().optional(),
        descriptionMetaDescription: Joi.string().optional(),
        canonicalUrl: Joi.string().optional(),
        body1: Joi.object().optional(),
        body2: Joi.object().optional(),
        type: Joi.string().optional(),
        image: Joi.string().optional(),
        category: Joi.array().items(Joi.string()).optional(),
        slug: Joi.string().optional(),
        tags: Joi.string().optional(),
        rating: Joi.number().optional().min(0).max(5),
        ppcPage: Joi.boolean().optional(),
        // addedByUser: Joi.string().optional(),
    })

    validateRequest({ req, res, next, schema })
}
