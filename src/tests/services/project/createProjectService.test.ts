import { describe, expect, it } from "vitest";
import { createProjectService } from "../../../services/project/createProjectService";
import { INewProject } from "../../../validationSchemas/project.schema";

describe("createProjectService", () => {
    const projectData = {
        name: "My Project"+ Math.random().toString(36).substring(7),
        description: "This is my project",
    };

    it("should create a new project", async () => {
        const data: INewProject = projectData
        const userId = "123456789";

        const result = await createProjectService(data, userId);

        expect(result.success).toBe(true);
        expect(result.data).toBeDefined();
        expect(result.data?.name).toBe(data.name);
        expect(result.data?.description).toBe(data.description);
    });
});