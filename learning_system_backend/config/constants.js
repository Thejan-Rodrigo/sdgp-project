// src/config/constants.js

const constants = {
	roles: {
	  SUPER_ADMIN: 'superadmin',
	  ADMIN: 'admin',
	  TEACHER: 'teacher',
	  PARENT: 'parent'
	},
  
	statusCodes: {
	  SUCCESS: 200,
	  CREATED: 201,
	  BAD_REQUEST: 400,
	  UNAUTHORIZED: 401,
	  FORBIDDEN: 403,
	  NOT_FOUND: 404,
	  INTERNAL_SERVER: 500
	},
  
	jwt: {
	  accessTokenExpiry: process.env.JWT_ACCESS_EXPIRATION_MINUTES || 30, // 30 minutes
	  refreshTokenExpiry: process.env.JWT_REFRESH_EXPIRATION_DAYS || 7,  // 7 days
	  issuer: 'nursery-management-system'
	},
  
	announcementStatus: {
	  DRAFT: 'draft',
	  PUBLISHED: 'published',
	  ARCHIVED: 'archived'
	},
  
	targetAudience: {
	  ALL: 'all',
	  PARENTS: 'parents',
	  TEACHERS: 'teachers',
	  ADMIN: 'admin'
	}
  };
  
  export default constants;
  